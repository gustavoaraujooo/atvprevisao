import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import axios from 'axios';

const iconesClima = {
  clear_day: require('./assets/clear_day.png'),
  clear_night: require('./assets/clear_night.png'),
  rain: require('./assets/rain.png'),
  storm: require('./assets/storm.png'),
  cloud: require('./assets/cloud.png'),
  snow: require('./assets/snow.png'),
  fog: require('./assets/fog.png'),
};

const App = () => {
  const [clima, setClima] = useState(null);
  const [cidade, setCidade] = useState('Recife,PE');
  const [buscando, setBuscando] = useState(false);

  const buscarClima = async () => {
    try {
      setBuscando(true);
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/weather?key=ebfa7683&city_name=${cidade}`
      );
      setClima(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar clima:', error);
      alert('Erro ao carregar clima.');
      setClima(null);
    } finally {
      setBuscando(false);
    }
  };

  useEffect(() => {
    buscarClima();
  }, []);

  if (!clima || buscando) {
    return (
      <View style={[estilos.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Carregando clima...</Text>
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <View style={estilos.inputArea}>
        <TextInput
          style={estilos.input}
          placeholder="Digite a cidade (ex: Recife,PE)"
          placeholderTextColor="#ccc"
          value={cidade}
          onChangeText={setCidade}
        />
        <TouchableOpacity onPress={buscarClima} style={estilos.botaoBusca}>
          <Feather name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={estilos.cabecalho}>
        <Feather name="map-pin" size={18} color="#fff" />
        <Text style={estilos.cidade}>{clima.city}</Text>
        <Feather name="bell" size={18} color="#fff" style={{ marginLeft: 'auto' }} />
      </View>

      <View style={estilos.climaIcone}>
        {clima.img_id && iconesClima[clima.img_id] && (
          <Image source={iconesClima[clima.img_id]} style={{ width: 80, height: 80 }} />
        )}
        <Text style={estilos.temperatura}>{clima.temp}º</Text>
        <Text style={estilos.rotulo}>{clima.description}</Text>
        {clima.forecast?.[0] && (
          <Text style={estilos.maxmin}>
            Máx: {clima.forecast[0].max}º  Mín: {clima.forecast[0].min}º
          </Text>
        )}
      </View>

      <View style={estilos.infoLinha}>
        <Text style={estilos.infoTexto}>💧 {clima.humidity}%</Text>
        <Text style={estilos.infoTexto}>🌡 Sensação: {clima.sensation}º</Text>
        <Text style={estilos.infoTexto}>🌬️ {clima.wind_speedy}</Text>
      </View>

      <View style={estilos.sol}>
        <Text style={estilos.solTexto}>🌅 Nascer do sol: {clima.sunrise}</Text>
        <Text style={estilos.solTexto}>🌇 Pôr do sol: {clima.sunset}</Text>
      </View>

      <View style={estilos.previsao}>
        <Text style={estilos.tituloSecao}>Próxima Previsão</Text>
        {clima.forecast?.slice(1, 3).map((dia, index) => (
          <View key={index} style={estilos.dia}>
            <Text style={estilos.diaTexto}>{dia.weekday}</Text>
            <MaterialCommunityIcons
              name={dia.condition === 'rain' ? 'weather-rainy' : 'weather-sunny'}
              size={24}
              color="#fff"
            />
            <Text style={estilos.diaTemp}>
              {dia.max}º / {dia.min}º
            </Text>
          </View>
        ))}
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
  inputArea: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#3A4ABF',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  botaoBusca: {
    marginLeft: 10,
    backgroundColor: '#293AAA',
    padding: 10,
    borderRadius: 8,
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
