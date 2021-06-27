import { useTheme } from "../hooks/useTheme"
import { FiMoon, FiSun} from 'react-icons/fi'
import '../styles/components/theme.scss'

export function ButtonTheme(){
  const {theme, toggleTheme} = useTheme()
return(
  <button className="buttonTheme" onClick={toggleTheme}>
    {theme === 'light' ? (<FiSun className="icon"/>) : (<FiMoon  color="#fff" className="icon" />) }
  </button>
  )
}