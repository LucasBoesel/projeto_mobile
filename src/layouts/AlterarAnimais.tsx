import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import LinearGradient from "react-native-linear-gradient";
import { AlterarAnimaisPropsNav } from "../navigation/HomeNavigator";
import { Animal } from '../types/Animal';
import { styles } from "../styles/styles";

const TelaAltAnimal = (props: AlterarAnimaisPropsNav) => {
  const animal = props.route.params.animal;
  const id = animal.id;

  const [nomeAnimal, setNomeAnimal] = useState("");
  const [tipo, setTipo] = useState("");
  const [raca, setRaca] = useState("");
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const resultado = await firestore().collection("animais").doc(id).get();
    const animalCarregado = {
      id: resultado.id,
      ...resultado.data(),
    } as Animal;

    setNomeAnimal(animalCarregado.nomeAnimal);
    setTipo(animalCarregado.tipo);
    setRaca(animalCarregado.raca);
    setObservacoes(animalCarregado.observacoes ?? "");
  }

  function alterar() {
    if (!verificaCampos()) return;

    const animalAtualizado: Partial<Animal> = {
      nomeAnimal,
      tipo,
      raca,
      observacoes,
    };

    firestore()
      .collection("animais")
      .doc(id)
      .update(animalAtualizado)
      .then(() => {
        Alert.alert("Animal", "Alterado com sucesso");
        props.navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Erro", "Não foi possível alterar o animal");
      });
  }

  function verificaCampos() {
    if (!nomeAnimal || !tipo || !raca) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos obrigatórios.");
      return false;
    }
    return true;
  }

  function confirmarExclusao() {
    Alert.alert(
      "Excluir Animal",
      "Tem certeza que deseja excluir este animal? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: excluirAnimal },
      ],
      { cancelable: true }
    );
  }

  async function excluirAnimal() {
    try {
      await firestore().collection("animais").doc(id).delete();
      Alert.alert("Animal", "Excluído com sucesso");
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível excluir o animal");
    }
  }

  return (
    <LinearGradient
      colors={["#a2c4f9", "#6fa8dc", "#3c78d8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={stylesLocal.containerScroll}>
          <Text style={stylesLocal.tituloTela}>Alteração de Animal</Text>

          <Text style={stylesLocal.titulo_campos}>Nome</Text>
          <TextInput
            style={stylesLocal.caixa_texto}
            value={nomeAnimal}
            onChangeText={setNomeAnimal}
            placeholder="Digite o nome"
            placeholderTextColor="#ccc"
          />

          <Text style={stylesLocal.titulo_campos}>Tipo</Text>
          <TextInput
            style={stylesLocal.caixa_texto}
            value={tipo}
            onChangeText={setTipo}
            placeholder="Digite a espécie"
            placeholderTextColor="#ccc"
          />

          <Text style={stylesLocal.titulo_campos}>Raça</Text>
          <TextInput
            style={stylesLocal.caixa_texto}
            value={raca}
            onChangeText={setRaca}
            placeholder="Digite a raça"
            placeholderTextColor="#ccc"
          />

          <Text style={stylesLocal.titulo_campos}>Observações</Text>
          <TextInput
            style={[stylesLocal.caixa_texto, { minHeight: 80, textAlignVertical: 'top' }]}
            value={observacoes}
            onChangeText={setObservacoes}
            placeholder="Digite observações (opcional)"
            placeholderTextColor="#ccc"
            multiline
          />

          <View style={stylesLocal.botoesContainer}>
            <Pressable style={stylesLocal.botao} onPress={alterar}>
              <Text style={stylesLocal.textoBotao}>Alterar</Text>
            </Pressable>
            <Pressable
              style={[stylesLocal.botaoVermelho, { marginTop: 12 }]}
              onPress={confirmarExclusao}
            >
              <Text style={stylesLocal.textoBotao}>Excluir</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default TelaAltAnimal;

const stylesLocal = StyleSheet.create({
  containerScroll: {
    padding: 20,
    paddingBottom: 40,
  },
  tituloTela: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  titulo_campos: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e0e0e0",
    marginBottom: 6,
    marginTop: 12,
  },
  caixa_texto: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  botoesContainer: {
    marginTop: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
  },
  botao: {
    backgroundColor: "#3c78d8",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#1a4db7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  botaoVermelho: {
    backgroundColor: "#d9534f",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#a33b33",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  textoBotao: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
});
// stylesLocal permanece igual
