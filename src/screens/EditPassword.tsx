import { SafeAreaView, StyleSheet, View } from "react-native";
import { StackHeader } from "../components/Headers/StackHeader";
import { MyInput } from "../components/MyInput";
import { useContext, useState } from "react";
import MainButton from "../components/MainButton";
import { AppStyles } from '../components/Shared/AppStyles';
import { LoginContext } from "../components/Shared/Context";
import { updateUserPassword } from "../services/UserServices";
import Snackbar from "react-native-snackbar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLoading } from "../hooks/useLoading";

type StackProps = NativeStackNavigationProp<any, any>;

const EditPassword = () => {

    const navigation = useNavigation<StackProps>();

    const { user } = useContext(LoginContext)

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const { isLoading, loading, stopLoading } = useLoading();

    const handleChangePassword = async () => {
        if (user && user._id) {
            loading();
            const result = await updateUserPassword(user._id, currentPassword, newPassword, confirmNewPassword);
            stopLoading();
            if (result.success) {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                navigation.goBack();
            }
            Snackbar.show({
                text: result.message,
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: result.success ? AppStyles.secondaryBlackColor : AppStyles.mainRedColor,
            });
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: AppStyles.backgroundColor, flex: 1 }}>
            <StackHeader title='Cambiar contraseña' />
            <View style={styles.container}>
                <MyInput
                    title="Contraseña actual"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                />
                <MyInput
                    title="Nueva contraseña"
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <MyInput
                    title="Confirmar nueva contraseña"
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                />
            </View>
            <MainButton
                title='Cambiar contraseña'
                color={AppStyles.mainRedColor}
                onPress={() => handleChangePassword()}
                loading={isLoading}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
    },
});

export default EditPassword;