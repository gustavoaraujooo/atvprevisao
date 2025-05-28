import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const App = () => {
  return (
    <View style={estilos.container}>
     
      <View style={estilos.cabecalho}>
        <Feather name="map-pin" size={18} color="#fff" />
        <Text style={estilos.cidade}>Recife</Text>
        <Feather name="bell" size={18} color="#fff" style={{ marginLeft: 'auto' }} />
      </View>

     
      <View style={estilos.climaIcone}>
        <Image
          source={{ uri: 'https://assets.hgbrasil.com/weather/icons/conditions/clear_day.svg' }}
          style={{ width: 70, height: 70 }}
        />
        <Text style={estilos.temperatura}>28º</Text>
        <Text style={estilos.rotulo}>Precipitações</Text>
        <Text style={estilos.maxmin}>Máx: 31º  Mín: 25º</Text>
      </View>

    
      <View style={estilos.infoLinha}>
        <Text style={estilos.infoTexto}>💧 6%</Text>
        <Text style={estilos.infoTexto}>💨 90%</Text>
        <Text style={estilos.infoTexto}>🌬️ 19 km/h</Text>
      </View>

   
      <View style={estilos.sol}>
        <Text style={estilos.solTexto}>🌅 Nascer do sol: 05:15</Text>
        <Text style={estilos.solTexto}>🌇 Pôr do sol: 17:45</Text>
      </View>

      <View style={estilos.previsao}>
        <Text style={estilos.tituloSecao}>Próxima Previsão</Text>
        <View style={estilos.dia}>
          <Text style={estilos.diaTexto}>Segunda</Text>
          <MaterialCommunityIcons name="weather-rainy" size={24} color="#fff" />
          <Text style={estilos.diaTemp}>13º / 10º</Text>
        </View>
        <View style={estilos.dia}>
          <Text style={estilos.diaTexto}>Terça</Text>
          <MaterialCommunityIcons name="weather-sunny" size={24} color="#fff" />
          <Text style={estilos.diaTemp}>17º / 12º</Text>
        </View>
      </View>
    </View>
  );
};

export default App;


const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2F97',
    padding: 20,
    paddingTop: 50,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cidade: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 5,
  },
  climaIcone: {
    alignItems: 'center',
    marginVertical: 30,
  },
  temperatura: {
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  rotulo: {
    color: '#fff',
    fontSize: 16,
  },
  maxmin: {
    color: '#fff',
    fontSize: 14,
  },
  infoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  infoTexto: {
    color: '#fff',
    fontSize: 14,
  },
  sol: {
    backgroundColor: '#293AAA',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  solTexto: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  previsao: {
    marginTop: 20,
  },
  tituloSecao: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  dia: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3A4ABF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  diaTexto: {
    color: '#fff',
    fontSize: 16,
  },
  diaTemp: {
    color: '#fff',
    fontSize: 16,
  },
});

