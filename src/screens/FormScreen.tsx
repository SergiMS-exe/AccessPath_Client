import { SafeAreaView, SectionList, StatusBar, StyleSheet, Text, View } from "react-native";
import { Titulo } from "../components/Titulo";

const data = [
    {
        title: 'Física',
        data: ['Entrada suficiente', 'Rampa']
    },
    {
        title: 'Sensorial',
        data: ['A', 'B', 'C']
    }
]

export const FormScreen = () => {
    return (
        <SafeAreaView>
            <Titulo title='Formulario' />
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item}</Text>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
});