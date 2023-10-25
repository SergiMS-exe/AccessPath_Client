import { FlatList, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Site } from "../../../@types/Site";
import { Titulo } from "../Titulo";

type Props = {
    data: Site[];
    title?: JSX.Element;
    noItemsMessage: string;
    isLoading?: boolean;
    renderItemComponent: (item: Site) => JSX.Element;
}

export const ResultList = ({ data, title, noItemsMessage, isLoading, renderItemComponent }: Props) => {

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
    }

    if (data.length === 0) {
        return <Text style={styles.emptyListMessage}>{noItemsMessage}</Text>;
    }

    return (
        <FlatList
            key={data.length}
            data={data}
            style={styles.container}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderItemComponent(item)}
            contentContainerStyle={styles.content}
            ListHeaderComponent={title || null}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 5,
        flex: 1
    },
    emptyListMessage: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },
    content: {
        flexGrow: 1,
    }
})