import { createContext } from 'react';
import { LoginContextType } from '../../../@types/LoginContextType';
import { Site } from '../../../@types/Site';

// Crea el contexto con el valor por defecto basado en localStorage
export const LoginContext = createContext<LoginContextType>({ user: undefined, setUser: () => { } })

export const CloseSitesContext = createContext<{ sites: Site[]; setSites: (sites: Site[]) => void }>({
    sites: [],
    setSites: () => { }
});