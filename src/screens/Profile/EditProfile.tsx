import { SafeAreaView } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";
import { useContext } from "react";
import { LoginContext } from "../../components/Shared/Context";

export const EditProfile = () => {
    
    const { user } = useContext(LoginContext);

    return (
        <SafeAreaView style={{flexGrow:1}}>
            <StackHeader title='Editar Perfil'/>
        </SafeAreaView>
    );
};