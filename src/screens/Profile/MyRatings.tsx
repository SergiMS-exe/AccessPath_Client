import { SafeAreaView } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../components/Shared/Context";
import { Valoracion } from "../../../@types/Valoracion";
import { Site } from "../../../@types/Site";
import { getUserRatings } from "../../services/UserServices";
import Snackbar from "react-native-snackbar";
import { ResultList } from "../../components/Card/ResultList";
import SiteWMyItems from "../../components/SiteWMyItems";
import { AddEditRating } from "../../components/AddEditRating";

export const MyRatings = () => {
    const { user } = useContext(LoginContext);

    const [sitesWRatings, setSitesWRatings] = useState<{ valoracion: Valoracion, site: Site }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const response = await getUserRatings(user);
                setSitesWRatings(response.sitesWRatings)
                if (!response.success && "message" in response) {
                    Snackbar.show({
                        text: response.message,
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: "red",
                    });
                } else if (response.success) {
                    setLoading(false);
                }
            }
        }

        fetchData();
    }, []);

    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <StackHeader title='Mis Valoraciones' />

            <ResultList
                data={sitesWRatings}
                noItemsMessage="No tienes valoraciones"
                isLoading={sitesWRatings.length === 0}
                renderItemComponent={(item) => (
                    <SiteWMyItems site={item.site}>
                        <AddEditRating site={item.site} isEditing />
                    </SiteWMyItems>
                )}
            />
        </SafeAreaView>
    );
}