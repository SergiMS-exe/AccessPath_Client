import { createContext } from 'react';
import { LoginContextType } from '../../../@types/LoginContextType';
import { Site } from '../../../@types/Site';
import { Filters } from '../../hooks/useSitesContext';

export const initialFilters: Filters = {
    hasPhotos: false,
    hasComments: false,
    hasPhysicalRating: false,
    hasSensorialRating: false,
    hasPsychicRating: false,
};

// Crea el contexto con el valor por defecto basado en localStorage
export const LoginContext = createContext<LoginContextType>({ user: undefined, setUser: () => { } })

export const CloseSitesContext = createContext<{ sites: Site[]; setSites: (sites: Site[]) => void, filteredSites: Site[]; applyFilters: (filters: Filters) => void, appliedFilters: Filters }>({
    sites: [],
    setSites: () => { },
    filteredSites: [],
    applyFilters: () => { },
    appliedFilters: initialFilters
});