import { createContext, useState, useEffect } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';


export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);  
      setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  }, []);
  
  // this added the categories collection to Firebase and we only want it to run ones because evry time we run it it will try to set new valuesinside the database
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, [])
  const value = { categoriesMap };
  return(
    <CategoriesContext.Provider value={value}> {children} </CategoriesContext.Provider>
  )
}