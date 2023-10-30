import { SafeAreaView, StyleSheet } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";
import { useContext, useEffect, useState } from "react";
import { LoginContext, MySitesContext } from "../../components/Shared/Context";
import { getUserComments } from "../../services/UserServices";
import { Site } from "../../../@types/Site";
import SiteWMyItems from '../../components/SiteWMyItems';
import { ResultList } from "../../components/Card/ResultList";
import CommentList from "../../components/CommentList";
import { useIsFocused } from "@react-navigation/native";

export const MyComments = () => {
    const { user } = useContext(LoginContext);
    const { myComments, setMyComments } = useContext(MySitesContext);

    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const sites: Site[] = await getUserComments(user!)
            console.log(JSON.stringify(sites, null, 2));
            setMyComments(sites);
            setLoading(false);
        }
        fetchData();
    }, []);

    const deleteSiteFromList = (placeId: string) => {
        //Remove site from sites list
        const newSites = myComments.filter(site => site.placeId !== placeId);
        setMyComments([...newSites]);
    }


    return (
        <SafeAreaView style={{ flexGrow: 1 }}>
            <StackHeader title='Mis Comentarios' />
            <ResultList
                data={myComments}
                noItemsMessage='No has comentado en ningún sitio'
                isLoading={loading}
                renderItemComponent={(site) => (
                    <SiteWMyItems site={site}>
                        <CommentList site={site} deleteSiteFromList={deleteSiteFromList} />
                    </SiteWMyItems>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        margin: 10,
    }
});