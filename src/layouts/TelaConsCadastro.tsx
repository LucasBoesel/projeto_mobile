import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { TelaConsCadastroPropsNav } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";

// Tipo do cliente
type Cliente = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  comorbidade: string;
};

const TelaConsCadastro = (props: TelaConsCadastroPropsNav) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('clientes')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Cliente[];

        setClientes(data);
      });

    return () => subscribe();
  }, []);

  function deletarCliente(id: string) {
    firestore()
      .collection('clientes')
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Cliente", "Removido com sucesso");
      })
      .catch((error) => console.log(error));
  }

  function alterarCliente(id: string) {
    // props.navigation.navigate("TelaAltCliente", { id });
  }

  return (
    <View style={styles.tela}>
      <Text style={styles.tituloTela}>Listagem de Clientes</Text>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={(info) => (
          <ItemCliente
            numeroOrdem={info.index + 1}
            cliente={info.item}
            onDeletar={deletarCliente}
            onAlterar={alterarCliente}
          />
        )}
      />

      <View style={styles.centralizar}>
        <Pressable
          style={[styles.botao, { width: '40%' }]}
          onPress={() => props.navigation.goBack()}>
          <Text style={styles.texto_botao}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
};

type ItemClienteProps = {
  numeroOrdem: number;
  cliente: Cliente;
  onDeletar: (id: string) => void;
  onAlterar: (id: string) => void;
};

const ItemCliente = (props: ItemClienteProps) => {
  return (
    <View style={styles.card}>
      <View style={styles_local.dados_card}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          {props.numeroOrdem + ' - ' + props.cliente.nome}
        </Text>
        <Text>Email: {props.cliente.email}</Text>
        <Text>Telefone: {props.cliente.telefone}</Text>
        <Text>Comorbidade: {props.cliente.comorbidade}</Text>
      </View>

      <View style={styles_local.botoes_card}>
        <View style={styles_local.botao_deletar}>
          <Pressable onPress={() => props.onDeletar(props.cliente.id)}>
            <Text style={styles_local.texto_botao_card}>X</Text>
          </Pressable>
        </View>

        <View style={styles_local.botao_alterar}>
          <Pressable onPress={() => props.onAlterar(props.cliente.id)}>
            <Text style={styles_local.texto_botao_card}>A</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TelaConsCadastro;

const styles_local = StyleSheet.create({
  dados_card: {
    flex: 1,
  },
  botoes_card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botao_deletar: {
    backgroundColor: 'red',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  botao_alterar: {
    backgroundColor: 'yellow',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  texto_botao_card: {
    fontWeight: "bold",
    fontSize: 24,
    color: 'black',
  }
});
