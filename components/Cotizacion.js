import React, {useState} from 'react';
import { Text, StyleSheet, View } from 'react-native';


const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).length === 0) return null;

    return (
        <View style={style.resultado}>
            <Text style={[style.texto, style.precio]}>
                <Text style={style.span}>{resultado.PRICE}</Text>
            </Text>
            <Text style={style.texto}> Precio mas alto del día {' '}
                <Text style={style.span}>{resultado.HIGHDAY}</Text>
            </Text>
            <Text style={style.texto}> Precio mas bajo del dìa {' '}
                <Text style={style.span}>{resultado.LOWDAY}</Text>
            </Text>
            <Text style={style.texto}>variacion ultimas 24 horas {' '}
                <Text style={style.span}>{resultado.CHANGEPCT24HOUR} {'%'}</Text>
            </Text>
            <Text style={style.texto}>Ultima actualizacion {' '}
                <Text style={style.span}>{resultado.LASTUPDATE}</Text>
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    resultado : {
        backgroundColor : '#5E49E2',
        padding : 20,

    },
    texto:{
        color : '#fff',
        fontFamily : 'Lato-Regular',
        fontSize : 18,
        marginBottom : 10

    },
    precio:{
        fontSize : 38

    },
    span : {
        fontFamily : 'Lato-Black',

    }
});

export default Cotizacion;