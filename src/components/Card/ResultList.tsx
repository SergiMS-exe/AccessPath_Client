import { FlatList, StyleSheet, View } from "react-native";
import { Site } from "../../../@types/Site";
import { ListCard } from "./ListCard";
import { Titulo } from "../Titulo";
import { Text } from "@rneui/base";

type Props = {
    data: Site[];
    title: string;
    noItemsMessage: string;
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        alignItems: "center"
    },
    emptyListMessage: {
        fontSize: 20
    },
})

export const ResultList = ({ data, title, noItemsMessage }: Props) => {
    const renderListItem = ({ item }: { item: Site }) => <ListCard site={item} />;

    return (
        <View style={styles.container}>
            <FlatList
                // data={[...data, ...data]}
                data={data}
                //keyExtractor={(item) => item._id?.toString() || ''}
                renderItem={renderListItem}
                contentContainerStyle={{flexGrow: 1}}
                ListHeaderComponent={<Titulo title={title}/>}
                ListEmptyComponent={<Text style={styles.emptyListMessage}>{noItemsMessage}</Text>}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
