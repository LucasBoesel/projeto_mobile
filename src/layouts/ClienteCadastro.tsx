import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Alert, 
  StyleSheet, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { CadClientePropsNav } from '../navigation/HomeNavigator';

const ClienteCadastro = (props: CadClientePropsNav) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  const validarTelefone = (telefone: string) => {
    const regex = /^\d{4}-\d{4}$/;
    return regex.test(telefone);
  };

  const formatarTelefone = (text: string) => {
    const numeros = text.replace(/\D/g, '');
    if (numeros.length <= 4) {
      return numeros;
    }
    return numeros.slice(0, 4) + '-' + numeros.slice(4, 8);
  };

  const cadastrarCliente = async () => {
    if (!nome || !email || !senha || !telefone || !endereco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (!validarTelefone(telefone)) {
      Alert.alert('Erro', 'Telefone inválido. Use o formato 2345-1234.');
      return;
    }

    try {
      // Cria o documento sem id manual
      const docRef = await firestore()
        .collection('clientes')
        .add({
          nome,
          email,
          senha,
          telefone,
          endereco,
        });

      // Atualiza o documento para incluir o id gerado automaticamente
      await docRef.update({ id: docRef.id });

      Alert.alert('Sucesso', 'Cliente cadastrado com sucesso!');
      props.navigation.goBack();
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o cliente. Tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F1F8E9' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={custom.cardContainer}>
        <Text style={custom.title}>Cadastro de Cliente</Text>

        <Text style={custom.label}>Nome:</Text>
        <TextInput
          style={custom.input}
          placeholder="Digite o nome"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={custom.label}>Email:</Text>
        <TextInput
          style={custom.input}
          placeholder="Digite o email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={custom.label}>Senha:</Text>
        <TextInput
          style={custom.input}
          placeholder="Digite a senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Text style={custom.label}>Telefone:</Text>
        <TextInput
          style={custom.input}
          placeholder="Digite o telefone (ex: 2345-1234)"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={telefone}
          maxLength={9}
          onChangeText={text => setTelefone(formatarTelefone(text))}
        />

        <Text style={custom.label}>Endereço:</Text>
        <TextInput
          style={custom.input}
          placeholder="Digite o endereço"
          placeholderTextColor="#888"
          value={endereco}
          onChangeText={setEndereco}
        />

        <View style={custom.buttonContainer}>
          <TouchableOpacity style={custom.greenButton} onPress={cadastrarCliente}>
            <Text style={custom.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={custom.redButton}
            onPress={() => {
              setNome('');
              setEmail('');
              setSenha('');
              setTelefone('');
              setEndereco('');
            }}
          >
            <Text style={custom.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const custom = StyleSheet.create({
  cardContainer: {
    padding: 30,
    backgroundColor: '#ffffff',
    margin: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#33691E',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#33691E',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    height: 48,
    backgroundColor: '#F1F8E9',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#C5E1A5',
    color: '#000',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  greenButton: {
    backgroundColor: '#66BB6A',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 4,
  },
  redButton: {
    backgroundColor: '#EF5350',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ClienteCadastro;
