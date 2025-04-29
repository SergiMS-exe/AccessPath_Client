import { SafeAreaView, View } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";
import { useContext, useEffect, useState } from "react";
import { Site } from "../../../@types/Site";
import { getUserPhotos } from "../../services/UserServices";
import { LoginContext, MySitesContext } from "../../components/Shared/Context";
import Snackbar from "react-native-snackbar";
import { ResultList } from "../../components/Card/ResultList";
import PhotoCarousel from "../../components/PhotoCarousel";
import SiteWMyItems from "../../components/SiteWMyItems";
import { AppStyles } from "../../components/Shared/AppStyles";

const MyPhotos = () => {

    const { user } = useContext(LoginContext);
    const { myPhotos } = useContext(MySitesContext)

    const [sitesWithPhotos, setSitesWithPhotos] = useState<Site[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const response = await getUserPhotos(user);
                if (response.success) {
                    setSitesWithPhotos(response.sites);
                    setLoading(false);
                } else if ('message' in response) {
                    Snackbar.show({
                        text: response.message,
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: 'red',
                    });
                }
            } else {
                Snackbar.show({
                    text: 'Debes iniciar sesión para ver tus fotos',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: 'red',
                });
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        setSitesWithPhotos(myPhotos);
    }, [myPhotos]);

    return (
        <SafeAreaView style={{ flexGrow: 1, backgroundColor: AppStyles.backgroundColor }}>
            <StackHeader title="Mis fotos" />
            <ResultList
                data={sitesWithPhotos}
                noItemsMessage='No has subido ninguna foto'
                isLoading={loading}
                renderItemComponent={(site) => (
                    <SiteWMyItems site={site}>
                        <View style={{ marginTop: 10 }}>
                            <PhotoCarousel photos={site.fotos} />
                        </View>
                    </SiteWMyItems>
                )}
            />
        </SafeAreaView>
    );
}

export default MyPhotos;