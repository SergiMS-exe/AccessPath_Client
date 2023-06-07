import { useContext, useState } from "react"
import Person from "../../@types/Person"
import { Site } from "../../@types/Site"
import { toggleSave } from "../services/PlacesServices"
import { LoginContext } from "../components/Shared/Context"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const useSiteSaving = (site: Site) => {
    const { user, setUser } = useContext(LoginContext);

    const toggleUserContext = (isSaved: boolean) => {
        if (user) {
            const newUser = new Person(user);
            if (!isSaved)
                newUser.save(site.placeId)
            else
                newUser.unSave(site.placeId)
            setUser(newUser)
        }
    }

    const save = async () => {
        if (user) {
            await toggleSave(site, user, true);
            saveSiteToStorage(site);
        }
    }

    const unSave = async () => {
        if (user) {
            await toggleSave(site, user, false);
            removeSiteFromStorage(site)
        }
    }

    const saveSiteToStorage = async (site: Site) => {
        try {
            const savedSitesJson = await AsyncStorage.getItem("savedSites");
            let savedSites: Site[] = [];
            if (savedSitesJson) {
                savedSites = JSON.parse(savedSitesJson);
            }
            savedSites.push(site);
            await AsyncStorage.setItem("savedSites", JSON.stringify(savedSites));
        } catch (error) {
            console.error("Error al guardar el sitio en AsyncStorage:", error);
        }
    };

    const removeSiteFromStorage = async (site: Site) => {
        try {
            const savedSitesJson = await AsyncStorage.getItem("savedSites");
            let savedSites: Site[] = [];
            if (savedSitesJson) {
                savedSites = JSON.parse(savedSitesJson);
            }
            const index = savedSites.findIndex((s) => s.placeId === site.placeId);
            if (index !== -1) {
                savedSites.splice(index, 1);
                await AsyncStorage.setItem("savedSites", JSON.stringify(savedSites));
            }
        } catch (error) {
            console.error("Error al quitar el sitio de AsyncStorage:", error);
        }
    };

    return { save, unSave, toggleUserContext };
}