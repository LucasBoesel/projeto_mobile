import { useEffect, useState } from "react";
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
import { AlterarClientesPropsNav } from "../navigation/HomeNavigator";
import { Cliente } from "../types/Cliente";
import { styles } from "../styles/styles";

const TelaAltCliente = (props: AlterarClientesPropsNav) => {
  const clienteParam = props.route.params.cliente;
  const id = clienteParam?.id;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    console.log("Cliente recebido na rota:", clienteParam);
    if (!id) {
      Alert.alert("Erro", "ID do cliente inválido");
      props.navigation.goBack();
      return;
    }

    // Buscar os dados atualizados diretamente do Firestore
    carregar();
  }, [id]);

  async function carregar() {
  try {
    const emailBusca = clienteParam?.email;

    if (!emailBusca) {
      Alert.alert("Erro", "Email do cliente não fornecido");
      props.navigation.goBack();
      return;
    }

    console.log("Buscando cliente pelo email:", emailBusca);

    const querySnapshot = await firestore()
      .collection("clientes")
      .where("email", "==", emailBusca)
      .get();

    if (querySnapshot.empty) {
      Alert.alert("Erro", "Cliente não encontrado com esse email");
      props.navigation.goBack();
      return;
    }
    

    const doc = querySnapshot.docs[0];
    const dados = doc.data();

    console.log("Cliente encontrado:", dados);

    setNome(dados.nome ?? "");
    setEmail(dados.email ?? "");
    setTelefone(dados.telefone ?? "");
    setEndereco(dados.endereco ?? "");
    setSenha(dados.senha ?? "");

    // Atualiza o id para futuras alterações/exclusões
    clienteParam.id = doc.id;

  } catch (error) {
    console.error("Erro ao buscar cliente por email:", error);
    Alert.alert("Erro", "Não foi possível carregar os dados do cliente");
  }
}

  function alterar() {
    if (!verificaCampos()) return;

    const clienteAtualizado: Partial<Cliente> = {
      nome,
      email,
      telefone,
      endereco,
      senha,
    };

    firestore()
      .collection("clientes")
      .doc(id)
      .update(clienteAtualizado)
      .then(() => {
        Alert.alert("Cliente", "Alterado com sucesso");
        props.navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Erro", "Não foi possível alterar o cliente");
      });
  }

  function verificaCampos() {
    if (!nome || !email || !telefone || !endereco || !senha) {
      Alert.alert("Campos obrigatórios", "Preencha todos os campos.");
      return false;
    }
    return true;
  }

  function confirmarExclusao() {
    Alert.alert(
      "Excluir Cliente",
      "Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: excluirCliente },
      ],
      { cancelable: true }
    );
  }

  async function excluirCliente() {
    try {
      await firestore().collection("clientes").doc(id).delete();

      Alert.alert("Cliente", "Excluído com sucesso");
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível excluir o cliente");
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
          <Text style={stylesLocal.tituloTela}>Alteração de Cliente</Text>

          <Text style={stylesLocal.titulo_campos}>Nome</Text>
          <TextInput
            style={stylesLocal.caixa_texto}
            value={nome}
            onChangeText={setNome}
            placeholder="Digite o nome"
            placeholderTextColor="#ccc"
          />

          <Text style={stylesLocal.titulo_campos}>Email</Text>
          <TextInput
            style={stylesLocal.caixa_texto}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Digite o email"
            placeholderTextColor="#ccc"
            autoCapitalize="none"
          />

          <Text style={stylesLocal.titulo_campos}>Telefone</Text>
          <TextInput
            style={stylesLocal.caixa_texto}
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
            placeholder="Digite o telefone"
            placeholderTextColor="#ccc"
          />

          <Text style={stylesLocal.titulo_campos}>Endereço</Text>
          <TextInput
            style={stylesLocal.caixa_texto}
            value={endereco}
            onChangeText={setEndereco}
            placeholder="Digite o endereço"
            placeholderTextColor="#ccc"
          />

          <Text style={stylesLocal.titulo_campos}>Senha</Text>
          <TextInput
            style={stylesLocal.caixa_texto}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            placeholder="Digite a senha"
            placeholderTextColor="#ccc"
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

export default TelaAltCliente;

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
