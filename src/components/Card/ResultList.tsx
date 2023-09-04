import { FlatList, StyleSheet, View } from "react-native";
import { Site } from "../../../@types/Site";
import { ListCard } from "./ListCard";
import { Titulo } from "../Titulo";
import { Text } from "@rneui/base";

type Props = {
    data: Site[];
    title?: string;
    noItemsMessage: string;
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 5
    },
    emptyListMessage: {
        fontSize: 20
    },
    content : {
        flexGrow: 1,
    }
})

export const ResultList = ({ data, title, noItemsMessage }: Props) => {
    const renderListItem = ({ item }: { item: Site }) => <ListCard site={item} />;

    return (
        // <View style={styles.container}>
            <FlatList
                data={data}
                style={styles.container}
                renderItem={renderListItem}
                contentContainerStyle={styles.content}
                ListHeaderComponent={title ? <Titulo title={title}/> : null}
                ListEmptyComponent={<Text style={styles.emptyListMessage}>{noItemsMessage}</Text>}
                showsVerticalScrollIndicator={false}
            />
        // </View>
    );
}
