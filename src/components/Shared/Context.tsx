import { createContext } from 'react';
import { LoginContextType } from '../../../@types/LoginContextType';

// Crea el contexto con el valor por defecto basado en localStorage
export const LoginContext = createContext<LoginContextType>({ user: undefined, setUser: () => { } })

