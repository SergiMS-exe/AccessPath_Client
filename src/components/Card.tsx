import { StyleSheet, Text, View } from "react-native"

const styles = StyleSheet.create({
    container: {
        zIndex: 2,
        marginLeft: '2.5%',
        borderWidth: 1,
        borderColor: 'black',
        height: 170,
        width: '95%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})

export const Card = () => {
    return (
        <View style={styles.container}>
            <Text>HI</Text>
        </View>
    )
}