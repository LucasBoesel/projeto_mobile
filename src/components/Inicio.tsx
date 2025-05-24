import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PrincipalProps } from '../navigation/HomeNavigator';

const TelaInicio = ({ navigation }: PrincipalProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro Paciente</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('FormularioCadastro')}
      >
        <Text style={styles.textoBotao}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  botao: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default TelaInicio;
