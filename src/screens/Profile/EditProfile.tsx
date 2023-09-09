import { SafeAreaView, StyleSheet, View } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";
import { useContext } from "react";
import { LoginContext } from "../../components/Shared/Context";
import { MyInput } from "../../components/MyInput";
import DisabilitySelector from "../../components/DisabilitySelector";
import MainButton from "../../components/MainButton";

export const EditProfile = () => {
    
    const { user } = useContext(LoginContext);

    return (
        <SafeAreaView style={styles.screen}>
            <StackHeader title='Editar Perfil'/>

            <View style={styles.form}>
                <MyInput title="Nombre" value={user?.nombre}/>
                <MyInput title="Apellidos" value={user?.apellidos}/>
                <MyInput title="Email" value={user?.email}/>
                <DisabilitySelector value={user?.tipoDiscapacidad as any}/>
            </View>

            <MainButton title='Guardar Cambios' onPress={() => {console.log('usuario editado')}}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen : {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    form: {
        flex: 1,
        marginTop: 20
    }

})