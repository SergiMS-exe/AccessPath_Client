import { FunctionComponent } from "react";
import { SafeAreaView } from "react-native";
import { StackHeader } from "../../components/Headers/StackHeader";

const MyPhotos = () => {
    return (
        <SafeAreaView>
            <StackHeader title="Mis fotos" />
        </SafeAreaView>
    );
}

export default MyPhotos;