import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../components/Shared/Context";
import { getUserComments } from "../../services/UserServices";
import { Site } from "../../../@types/Site";
import { SiteWMyComments } from '../../components/SiteWMyComments';

export const MyComments = () => {
    const { user } = useContext(LoginContext);

    const [sites, setSites] = useState<Site[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const sites = await getUserComments(user!)
            console.log(JSON.stringify(sites, null, 2));
            setSites(sites);
        }
        fetchData();
    }, []);

    return (
        <SafeAreaView style={{flexGrow:1}}>
            <StackHeader title='Mis Comentarios'/>
            <FlatList
                style={styles.listContainer}
                data={sites}
                renderItem={({ item }) => <SiteWMyComments site={item}/>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        margin: 10,
    }
});