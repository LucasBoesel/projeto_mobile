import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const CadastroProduto = () => {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [descricao, setDescricao] = useState('');

  const salvarProduto = async () => {
    if (!nome || !preco || !estoque) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios.');
      return;
    }

    try {
      await firestore().collection('produtos').add({
        nome,
        categoria,
        preco: parseFloat(preco),
        estoque: parseInt(estoque, 10),
        descricao,
        dataCadastro: new Date(),
      });

      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
      setNome('');
      setCategoria('');
      setPreco('');
      setEstoque('');
      setDescricao('');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o produto.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff3e0' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <Text style={styles.title}>📦 Cadastrar Produto</Text>

          <Text style={styles.label}>Nome do Produto *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Ração Premium"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>Categoria</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Ração, Brinquedo..."
            value={categoria}
            onChangeText={setCategoria}
          />

          <Text style={styles.label}>Preço (R$) *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 49.90"
            keyboardType="decimal-pad"
            value={preco}
            onChangeText={setPreco}
          />

          <Text style={styles.label}>Quantidade em Estoque *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 10"
            keyboardType="numeric"
            value={estoque}
            onChangeText={setEstoque}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Observações adicionais"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={salvarProduto}>
            <Text style={styles.buttonText}>Salvar Produto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff3e0',
  },
  container: {
    width: '90%',
    maxWidth: 420,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ef6c00',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#ef6c00',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    height: 48,
    backgroundColor: '#ffe0b2',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ffcc80',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#ef6c00',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CadastroProduto;