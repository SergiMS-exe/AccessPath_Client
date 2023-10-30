import { useState } from "react";
import { Site } from "../../@types/Site";

export interface Filters {
    hasPhotos: boolean;
    hasComments: boolean;
    hasPhysicalRating: boolean;
    hasSensorialRating: boolean;
    hasPsychicRating: boolean;
}

const useSitesContext = () => {
    const [sites, setSites] = useState<Site[]>([]);
    const [filteredSites, setFilteredSites] = useState<Site[]>([]);
    const [appliedFilters, setAppliedFilters] = useState<Filters>({
        hasPhotos: false,
        hasComments: false,
        hasPhysicalRating: false,
        hasSensorialRating: false,
        hasPsychicRating: false
    });

    const applyFilters = (filters: Filters) => {
        setAppliedFilters(filters);
        const filtered = sites.filter(site => {
            const hasComments = site.comentarios && site.comentarios.length > 0;
            const hasPhotos = site.fotos && site.fotos.length > 0;
            const hasPhysicalRating = site.valoraciones?.fisica !== undefined;
            const hasSensorialRating = site.valoraciones?.sensorial !== undefined;
            const hasPsychicRating = site.valoraciones?.psiquica !== undefined;

            return (!filters.hasPhotos || hasPhotos) &&
                (!filters.hasComments || hasComments) &&
                (!filters.hasPhysicalRating || hasPhysicalRating) &&
                (!filters.hasSensorialRating || hasSensorialRating) &&
                (!filters.hasPsychicRating || hasPsychicRating);
        });
        setFilteredSites(filtered);
    };

    return {
        sites,
        setSites,
        filteredSites,
        applyFilters,
        appliedFilters
    };
};

export default useSitesContext;