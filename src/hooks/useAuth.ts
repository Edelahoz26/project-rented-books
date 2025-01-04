import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';


//este hooks accede a nuestro contexto, extraer el value y devolverlo
const useAuth = () => useContext(AuthContext);
export default useAuth;