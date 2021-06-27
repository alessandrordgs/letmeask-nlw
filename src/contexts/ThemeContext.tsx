import { useEffect } from 'react';
import { ReactNode, useState } from 'react';
import { createContext } from 'react';

type Theme = 'light' | 'dark'
type ThemeContextProviderProps = {
  children: ReactNode
}

type ThemeContextType = {
  theme:Theme,
  toggleTheme:() => void;
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);


export function ThemeContextProvider (props : ThemeContextProviderProps){
  const [currentTheme, setCurrentTheme] = useState<Theme>(() =>{
    
    const storegedTheme = localStorage.getItem('theme')

    return (storegedTheme ?? 'light')as Theme; 
  })

  useEffect(()=> {
    localStorage.setItem('theme', currentTheme)
  }, [currentTheme])

  function toggleTheme(){
    setCurrentTheme( currentTheme === 'light' ? 'dark' : 'light')
  }
  return(
    <ThemeContext.Provider value={{theme: currentTheme, toggleTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}