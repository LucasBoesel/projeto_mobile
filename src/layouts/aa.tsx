import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { CadFormularioPropsNav } from "../navigation/HomeNavigator";
import { styles } from '../styles/styles';
import firestore from "@react-native-firebase/firestore";

const FormularioCadastro = (props: CadFormularioPropsNav) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [grau, setGrau] = useState('');

  // Limpar os campos quando a tela de cadastro for exibida
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setNome('');
      setIdade('');
      setDescricao('');
      setGrau('');
    });

    // Limpeza do listener quando a tela for desmontada
    return unsubscribe;
  }, [props.navigation]);

  const cadastrar = async () => {
    if (!nome || !idade || !descricao || !grau) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (isNaN(Number(idade)) || Number(idade) <= 0) {
      Alert.alert('Erro', 'Idade inválida.');
      return;
    }

    if (isNaN(Number(grau)) || Number(grau) < 1 || Number(grau) > 5) {
      Alert.alert('Erro', 'Grau deve ser um número entre 1 e 5.');
      return;
    }

    try {
      await firestore()
        .collection('fila_atendimento')
        .add({
          nome,
          idade: Number(idade),
          descricao,
          grau: grau.toString(),  // Assegure que o grau é uma string
        });

      Alert.alert('Sucesso', 'Paciente cadastrado com sucesso!');
      props.navigation.navigate('TelaFilaAtentimento'); // Navega para a tela de fila de espera
    } catch (error) {
      Alert.alert('Erro ao cadastrar', String(error));
    }
  };

  const cancelar = () => {
    setNome('');
    setIdade('');
    setDescricao('');
    setGrau('');
  };

  const verFila = () => {
    props.navigation.navigate('TelaFilaAtentimento'); // Navega para a tela de fila de espera
  };

  return (
    <View style={[styles.card, { padding: 30 }]}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.tituloTela}>Cadastro de Paciente</Text>
      </View>

      <Text style={styles.titulo_campos}>Nome:</Text>
      <TextInput
        style={styles.caixa_texto}
        placeholder="Digite o nome"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.titulo_campos}>Idade:</Text>
      <TextInput
        style={styles.caixa_texto}
        placeholder="Digite a idade"
        placeholderTextColor="#999"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />

      <Text style={styles.titulo_campos}>Descrição da enfermidade:</Text>
      <TextInput
        style={styles.caixa_texto}
        placeholder="Descreva a enfermidade"
        placeholderTextColor="#999"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <Text style={styles.titulo_campos}>Grau (1 a 5):</Text>
      <TextInput
        style={styles.caixa_texto}
        placeholder="Digite o grau"
        placeholderTextColor="#999"
        value={grau}
        onChangeText={setGrau}
        keyboardType="numeric"
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        <TouchableOpacity style={styles.botao} onPress={cadastrar}>
          <Text style={styles.texto_botao}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao_vermelho} onPress={cancelar}>
          <Text style={styles.texto_botao}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {/* Novo botão Ver Fila */}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity style={styles.botao_fila} onPress={verFila}>
          <Text style={styles.texto_botao}>Ver Fila</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormularioCadastro;