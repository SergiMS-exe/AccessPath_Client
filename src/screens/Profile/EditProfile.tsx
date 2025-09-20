import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";
import { useContext, useState } from "react";
import { LoginContext } from "../../components/Shared/Context";
import { MyInput } from "../../components/MyInput";
import DisabilitySelector from "../../components/DisabilitySelector";
import MainButton from "../../components/MainButton";
import { updateAccount, deleteAccount, logout } from "../../services/UserServices";
import Person from "../../../@types/Person";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { TypesOfDisabilitiesValue } from "../../../@types/Valoracion";
import React from "react";
import { AppStyles } from "../../components/Shared/AppStyles";
import { Divider } from "@rneui/themed";
import Snackbar from "react-native-snackbar";
import { useLoading } from "../../hooks/useLoading";

type StackProps = NativeStackNavigationProp<any, any>;
type DrawerProps = DrawerNavigationProp<any, any>;

export const EditProfile = () => {

    const stackNavigation = useNavigation<StackProps>();
    const drawerNavigation = useNavigation<DrawerProps>();

    const { user, setUser } = useContext(LoginContext);

    const [nombre, setNombre] = useState(user!.nombre);
    const [apellidos, setApellidos] = useState(user!.apellidos);
    const [email, setEmail] = useState(user!.email);
    const [tipoDiscapacidad, setTipoDiscapacidad] = useState(user!.tipoDiscapacidad);

    const { isLoading, loading, stopLoading } = useLoading();

    const handleUpdateProfile = async () => {
        loading();
        //Person con los datos actualizados
        const updatedUser = new Person({
            _id: user!._id,
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            tipoDiscapacidad: tipoDiscapacidad,
        });
        //Llamada a la API para actualizar el perfil
        const result = await updateAccount(updatedUser);
        stopLoading();
        if (result.success) {
            setUser(updatedUser);
            stackNavigation.goBack();
        }
        Snackbar.show({
            text: result.message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: result.success ? AppStyles.secondaryBlackColor : AppStyles.mainRedColor,
        });
        //Alert.alert(result.success ? 'Perfil actualizado correctamente' : 'Error: ' + result.message);
    };

    const handleDisabilityChange = (newValue: TypesOfDisabilitiesValue) => {
        setTipoDiscapacidad(newValue);
    };

    const handleDeleteAccount = async () => {
        Alert.alert(
            "Borrar cuenta",
            "¿Estás seguro de que quieres borrar tu cuenta? Esta acción es irreversible y no podrás recuperar tus datos.",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sí, borrar",
                    onPress: async () => {
                        // Aquí llamamos a la función que borra la cuenta, por ejemplo:
                        const result = await deleteAccount(user!._id);
                        if (result.success) {
                            stackNavigation.navigate('home');
                            drawerNavigation.navigate('Feed');
                            await logout(setUser);
                        } else {
                            Alert.alert('Error', 'No se pudo borrar la cuenta');
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.screen}>
            <StackHeader title='Editar Perfil' />

            <ScrollView
                style={styles.form}>
                <MyInput
                    title="Nombre"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <MyInput
                    title="Apellidos"
                    value={apellidos}
                    onChangeText={setApellidos}
                />
                <MyInput
                    title="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <DisabilitySelector
                    value={tipoDiscapacidad}
                    onChange={handleDisabilityChange}
                />

                <View style={{width: 100, height: 15}}/>
                {/* Botón Guardar cambios */}
                <MainButton title='Guardar cambios' onPress={() => handleUpdateProfile()} loading={isLoading} />

                <Divider color={AppStyles.mainRedColor} width={1} style={{ marginVertical: 20 }} />
                <MainButton containerStyle={{ borderColor: AppStyles.mainRedColor, borderWidth: 2 }} titleStyle={{ color: AppStyles.mainRedColor }} title='Cambiar contraseña' color='white' onPress={() => stackNavigation.navigate('editPassword')} />
                <MainButton title='Borrar cuenta' color={AppStyles.mainRedColor} onPress={() => handleDeleteAccount()} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        backgroundColor: AppStyles.backgroundColor
    },
    form: {
        marginVertical: 15
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: AppStyles.mainRedColor,
        marginVertical: 15,
        alignItems: 'center',
    },
    dividerText: {
        fontSize: 18,
        paddingHorizontal: 10,
    },
    changePasswordTitle: {
        fontSize: 16,
        marginLeft: 10
    },
    changePasswordContainer: {
        marginHorizontal: 10,
        marginBottom: 10,
        marginTop: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: AppStyles.mainRedColor,
    }
})