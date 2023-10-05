import { useState } from "react"
import { Site } from "../../@types/Site"

const useSitesContext = () => {
    const [sites, setSites] = useState<Site[]>([]);

    const addSites = (newSites: Site[]) => { //Si se quiere usar esto hay que modificar el SitesContext
        setSites([...sites, ...newSites]);
    }

    return { sites, setSites, addSites };
};

export default useSitesContext;