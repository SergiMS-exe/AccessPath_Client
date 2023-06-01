import React, {useEffect, useState} from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Titulo } from '../../components/Titulo';
import { Map } from '../../components/Map';
import { FloatingButton } from '../../components/FloatingButton';

interface Props extends NativeStackScreenProps<any, any> { };

export const MapSitesScreen = ({ navigation }: Props) => {

    const [showButton, setShowButton] = useState(true);

    useEffect(()=>{

    }, )

    return (
        <>
            {/* <Titulo title='Map'/> */}
            <Map setShowButton={setShowButton}/>
            { showButton &&
            <FloatingButton 
                text="Ver Lista" 
                onPress={() => navigation.navigate('List')} 
            />}
        </>
    )
}