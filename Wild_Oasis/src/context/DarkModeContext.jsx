import React, { createContext, useContext, useEffect } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

const DarkModeContext = createContext()

export const DarkModeProvider = ({children}) => {
   const [isDarkMode,setIsDarkMode] =useLocalStorageState(false,'isDarkMode');

   useEffect(()=>{
    if(isDarkMode){
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    }else{
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    }
   },[isDarkMode]);

   const toggleDarkMode = ()=>{
    setIsDarkMode(!isDarkMode)
   }

  return (
    <DarkModeContext.Provider value={{isDarkMode,toggleDarkMode}}>
       {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => {
     const context =useContext(DarkModeContext);
     if(context === undefined) throw new Error('DarkModeContext was used outside DarkModeProvider')
     return context
}

export default DarkModeContext