import React, {useState, useEffect} from 'react';
import { Text, StyleSheet, View, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';


const Formulario = ({moneda, criptomoneda, guardarMoneda, guardarCriptomoneda, guardarConsultarApi}) => {

    const [criptomonedas, guardarCriptomonedas] = useState([]);

    const obtenerMoneda = (moneda) => {
        guardarMoneda(moneda);
    }
    
    const obtenerCrito = (moneda) => {
        guardarCriptomoneda(moneda);
    }

    useEffect (()=>{
        const consultarApi = async () => {
            const url ='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarApi();
    }, [])

    const cotizarPrecio = () => {
        if(moneda.trim() === '' || criptomoneda === ''){
            mostrarAlerta();
            return;
        }
        guardarConsultarApi(true);
        
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                {text : 'OK'}
            ]
        )
    }

    return (
            <View>
                <Text style = {styles.label}>Moneda</Text>
                <Picker
                    selectedValue = {moneda}
                    onValueChange={moneda => obtenerMoneda (moneda)}
                    itemStyle ={{height:120}}
                >
                    <Picker.Item key='1' label= '- Seleccione -' value='' />
                    <Picker.Item key='2' label= '- Dolar -' value='USD' />
                    <Picker.Item key='3' label= '- Peso Mexicano -' value='MXN' />
                    <Picker.Item key='4' label= '- Euro -' value='EUR' />
                    <Picker.Item key='5' label= '- Libra Esterlina -' value='GBP' />
                    <Picker.Item key='6' label= '- Pesos Chilenos -' value='CLP' />
                </Picker>
                <Text style = {styles.label}>Criptomoneda</Text>
                <Picker
                    selectedValue = {criptomoneda}
                    onValueChange={moneda => obtenerCrito (moneda)}
                    itemStyle ={{height:120}}
                >
                    <Picker.Item label= '- Seleccione -' value='' />
                    {criptomonedas.length > 0 && criptomonedas.map( cripto => (
                        <Picker.Item key={cripto.CoinInfo.Id} label= {cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                    ))}
                </Picker>
                <TouchableHighlight
                    style={styles.btnCotizar}
                    onPress = {()=>cotizarPrecio()}
                >
                    <Text style={styles.textoCotizar} >Cotizar</Text>
                </TouchableHighlight>
            </View>
        )
}

const styles = StyleSheet.create({
    label : {
        fontFamily : 'Lato-Black',
        fontSize : 22,
        marginVertical : 20,
        textTransform : 'uppercase'
    },
    btnCotizar:{
        backgroundColor : '#5E49E2',
        padding : 10,
        marginTop : 20
    },
    textoCotizar : {
        color : '#fff',
        fontSize : 18,
        fontFamily : 'Lato-Black',
        textTransform : 'uppercase',
        textAlign : 'center'
    }
});

export default Formulario;