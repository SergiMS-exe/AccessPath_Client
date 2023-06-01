import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        zIndex: 2,
        marginLeft: '2.5%',
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        height: '35%',
        width: '95%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})

export const MapCard = () => {
    return (
        <View style={styles.container}>
            <Text>HI</Text>
        </View>
    )
}