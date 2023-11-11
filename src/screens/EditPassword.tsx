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

type StackProps = NativeStackNavigationProp<any, any>;

const EditPassword = () => {

    const navigation = useNavigation<StackProps>();

    const { user } = useContext(LoginContext)

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleChangePassword = async () => {
        if (user && user._id) {
            const result = await updateUserPassword(user._id, currentPassword, newPassword, confirmNewPassword);
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
        <SafeAreaView>
            <StackHeader title='Cambiar contraseña' />
            <View style={styles.container}>
                <MyInput
                    title="Contraseña actual"
                    value={currentPassword}
                    marginHorizontal={17}
                    onChangeText={setCurrentPassword}
                />
                <MyInput
                    title="Nueva contraseña"
                    value={newPassword}
                    marginHorizontal={17}
                    onChangeText={setNewPassword}
                />
                <MyInput
                    title="Confirmar nueva contraseña"
                    value={confirmNewPassword}
                    marginHorizontal={17}
                    onChangeText={setConfirmNewPassword}
                />
            </View>
            <MainButton
                title='Cambiar contraseña'
                color={AppStyles.mainRedColor}
                onPress={() => handleChangePassword()}

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