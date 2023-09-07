import React, { useContext } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { LoginContext } from '../components/Shared/Context';
import { logout } from '../services/UserServices';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Text } from '@rneui/base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

type StackProps = NativeStackNavigationProp<any, any>;
type DrawerProps = DrawerNavigationProp<any, any>;


export const ProfileScreen = () => {

    const stackNavigation = useNavigation<StackProps>();
    const drawerNavigation = useNavigation<DrawerProps>();
    
    const { setUser, user } = useContext(LoginContext)

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Icon name='user' size={60} />
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.name}>{user?.nombre} {user?.apellidos}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>
            </View>

            <ProfileButton iconName='user-edit' title='Editar Perfil' onPress={() => stackNavigation.navigate("editProfile")}/>
            {/* <ProfileButton iconName='universal-access' title='Prefencias de accesibilidad' onPress={() => {}}/> */}
            <ProfileButton iconName='star' title='Mis Valoraciones' onPress={() => stackNavigation.navigate("myRatings")}/>
            <ProfileButton iconName='comment' title='Mis Comentarios' onPress={() => stackNavigation.navigate("myComments")}/>
            <ProfileButton iconName='sign-out-alt' color='red' title='Cerrar Sesión' 
                onPress={ async () => {
                    await logout(setUser)
                    drawerNavigation.navigate("Feed")
                }} />
        </SafeAreaView>
    )
}

type ButtonProps = {
    onPress: () => void;
    title: string;
    iconName: string;
    color?: string;
}

const ProfileButton = ({ onPress, title, iconName, color = '#007AFF' }: ButtonProps) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
            <Icon name={iconName} style={styles.icon}/>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        alignItems: 'center',
        height: 200,
        justifyContent: 'space-evenly',
        borderBottomWidth: 0.3,
        borderBottomColor: 'black',
        marginBottom: 30
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    email: {
        fontSize: 20
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        minWidth: 100,
        marginVertical: 8,
        marginHorizontal: 20,
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 8
    },
    icon: {
        fontSize: 20,
        color: 'white',
    }
});