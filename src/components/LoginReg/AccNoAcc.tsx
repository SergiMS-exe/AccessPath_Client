import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppStyles } from '../Shared/AppStyles';

type Props = {
    goTo: string;
    viewFrom?: string;
    stackHeader?: boolean;
}

type DrawerProp = DrawerNavigationProp<any, any>;
type StackProps = NativeStackNavigationProp<any, any>;

export const AccNoAcc = ({ goTo, viewFrom, stackHeader }: Props) => {
    const drawerNav = useNavigation<DrawerProp>();
    const stackNav = useNavigation<StackProps>();
    
    const config = {
      registro: {
        screenName: 'Registro',
        stackName: 'register',
        question: '¿No tienes cuenta?',
        button: 'Regístrate'
      },
      login: {
        screenName: 'Login',
        stackName: 'login',
        question: '¿Ya tienes una cuenta?',
        button: 'Inicia sesión'
      }
    }[goTo];
  
    const handleNavigation = () => {
      const params = viewFrom ? { viewFrom, stackHeader } : undefined;
      if (stackHeader) {
        stackNav.navigate(config!.stackName, params);
      } else {
        drawerNav.navigate(config!.screenName, params);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{config?.question}</Text>
        <Text style={styles.link} onPress={handleNavigation}>
          {config?.button}
        </Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: '500'
    },
    link: {
        fontSize: 16,
        fontWeight: '500',
        color: AppStyles.mainBlueColor
    }
  });
  