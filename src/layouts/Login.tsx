import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import { LoginPropsNav } from '../navigation/HomeNavigator';

const Login = (props: LoginPropsNav) => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const snapshot = await firestore().collection('clientes').get();
        const listaClientes = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClientes(listaClientes);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os clientes.');
      }
    };

    fetchClientes();
  }, []);

  const handleLogin = () => {
    if (!clienteSelecionado) {
      Alert.alert('Erro', 'Por favor, selecione um cliente.');
      return;
    }

    // Navegar para a tela Menu passando o ID do cliente selecionado
    props.navigation.navigate('Menu', { clienteId: clienteSelecionado });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Picker
        selectedValue={clienteSelecionado}
        onValueChange={setClienteSelecionado}
        style={styles.picker}
        dropdownIconColor="#3c78d8"
      >
        <Picker.Item label="Selecione um Cliente..." value={null} />
        {clientes.map(cliente => (
          <Picker.Item key={cliente.id} label={cliente.nome} value={cliente.id} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e8f0fe', // azul claro de fundo
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3c78d8', // azul médio para contraste
    textAlign: 'center',
    marginBottom: 30,
  },
  picker: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
    width: '100%',
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#37589b', // azul claro
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
