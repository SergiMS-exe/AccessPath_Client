import { SafeAreaView } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";
import { useContext, useEffect, useState } from "react";
import { LoginContext, MySitesContext } from "../../components/Shared/Context";
import { Valoracion } from "../../../@types/Valoracion";
import { Site } from "../../../@types/Site";
import { getUserRatings } from "../../services/UserServices";
import Snackbar from "react-native-snackbar";
import { ResultList } from "../../components/Card/ResultList";
import SiteWMyItems from "../../components/SiteWMyItems";
import { AddEditRating } from "../../components/AddEditRating";

export const MyRatings = () => {
    const { user } = useContext(LoginContext);
    const { myRatings, setMyRatings } = useContext(MySitesContext);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                if (!myRatings || myRatings.length === 0) {
                    const response = await getUserRatings(user);
                    setMyRatings(response.sitesWRatings)
                    if (!response.success && "message" in response) {
                        Snackbar.show({
                            text: response.message,
                            duration: Snackbar.LENGTH_LONG,
                            backgroundColor: "red",
                        });
                    } else if (response.success) {
                        setLoading(false);
                    }
                } else
                    setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <StackHeader title='Mis Valoraciones' />

            <ResultList
                data={myRatings}
                noItemsMessage="No tienes valoraciones"
                isLoading={loading}
                renderItemComponent={(item) => (
                    <SiteWMyItems site={item.site}>
                        <AddEditRating site={item.site} valoracion={item.valoracion} calledFrom='myRatings' />
                    </SiteWMyItems>
                )}
            />
        </SafeAreaView>
    );
}