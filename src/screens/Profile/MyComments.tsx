import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../components/Shared/Context";
import { getUserComments } from "../../services/UserServices";
import { Site } from "../../../@types/Site";
import { SiteWMyComments } from '../../components/SiteWMyComments';
import { Text } from "@rneui/base";

export const MyComments = () => {
    const { user } = useContext(LoginContext);

    const [sites, setSites] = useState<Site[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const sites = await getUserComments(user!)
            console.log(JSON.stringify(sites, null, 2));
            setSites(sites);
            setLoading(false);
        }
        fetchData();
    }, []);

    const deleteSiteFromList = (placeId: string) => {
        //Remove site from sites list
        const newSites = sites.filter(site => site.placeId !== placeId);
        setSites(newSites);
    }

    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <StackHeader title='Mis Comentarios' />
            {loading && <ActivityIndicator size="large" style={{ marginTop: 10 }} />}
            {sites.length == 0 && !loading ?
                <Text>No has comentado en ningún sitio</Text>
                :
                <FlatList
                    style={styles.listContainer}
                    data={sites}
                    renderItem={({ item }) => <SiteWMyComments site={item} deleteSiteFromList={deleteSiteFromList}/>}
                />

            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        margin: 10,
    }
});