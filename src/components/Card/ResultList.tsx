import { FlatList, StyleSheet, View } from "react-native";
import { Site } from "../../../@types/Site";
import { ListCard } from "./ListCard";
import { Titulo } from "../Titulo";
import { Text } from "@rneui/base";

type Props = {
    data: Site[];
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

export const ResultList = ({ data }: Props) => {
    const renderListItem = ({ item }: { item: Site }) => <ListCard site={item} />;

    return (
        <View style={styles.container}>
            <FlatList
                // data={[...data, ...data]}
                data={data}
                //keyExtractor={(item) => item._id?.toString() || ''}
                renderItem={renderListItem}
                contentContainerStyle={{flexGrow: 1}}
                ListHeaderComponent={<Titulo title='Elementos valorados cercanos'/>}
                ListEmptyComponent={<Text style={styles.emptyListMessage}>No hay elementos valorados cerca de ti</Text>}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
