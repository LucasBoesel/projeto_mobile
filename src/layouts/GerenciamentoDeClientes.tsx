import { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import LinearGradient from "react-native-linear-gradient";
import { GerenciamentoClientesPropsNav } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";

// Tipo Cliente
type Cliente = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: string;
};

const GerenciamentoClientes = (props: GerenciamentoClientesPropsNav) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection("clientes")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          console.log(doc.id, " => ", doc.data());  
          return({
          id: doc.id,
          ...doc.data() ,
        }as Cliente)});
      
        data.sort((a, b) => Number(a.id) - Number(b.id));

        console.log("Clientes:", data);
        setClientes(data);
      });

    return () => subscribe();
  }, []);

  const navegarParaAlterar = (cliente: Cliente) => {
    props.navigation.navigate("AlterarClientes", { cliente });
  };

  return (
      <LinearGradient
        colors={["#a2c4f9", "#6fa8dc", "#3c78d8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.tela, { justifyContent: "flex-start", padding: 12 }]}
      >
      <Text style={styles.tituloTela}>Clientes</Text>

      <View style={styles_local.tabelaContainer}>
        <View style={[styles_local.row, styles_local.header]}>
          <Text style={[styles_local.cell, styles_local.headerText, { flex: 1 }]}>ID</Text>
          <Text style={[styles_local.cell, styles_local.headerText, { flex: 2 }]}>Nome</Text>
          <Text style={[styles_local.cell, styles_local.headerText, { flex: 3 }]}>Email</Text>
          <Text style={[styles_local.cell, styles_local.headerText, { flex: 3 }]}>Endereço</Text>
        </View>

        <FlatList
          data={clientes}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ItemCliente
              ordem={index + 1}
              cliente={item}
              isEven={index % 2 === 0}
              onPress={() => navegarParaAlterar(item)}
            />
          )}
          style={{ marginTop: 2 }}
          bounces={false}
        />
      </View>
    </LinearGradient>
  );
};

type ItemClienteProps = {
  cliente: Cliente;
  isEven: boolean;
  ordem: number;
  onPress: () => void;
};

const ItemCliente = ({ cliente, ordem, isEven, onPress }: ItemClienteProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[
        styles_local.row,
        isEven ? styles_local.evenRow : styles_local.oddRow,
      ]}
    >
      <Text style={[styles_local.cell, { flex: 1 }]} numberOfLines={1} ellipsizeMode="tail">{ordem}</Text>
      <Text style={[styles_local.cell, { flex: 2 }]} numberOfLines={1} ellipsizeMode="tail">{cliente.nome}</Text>
      <Text style={[styles_local.cell, { flex: 3 }]} numberOfLines={1} ellipsizeMode="tail">{cliente.email}</Text>
      <Text style={[styles_local.cell, { flex: 3 }]} numberOfLines={1} ellipsizeMode="tail">{cliente.endereco}</Text>
    </TouchableOpacity>
  );
};

export default GerenciamentoClientes;

const styles_local = StyleSheet.create({
  tabelaContainer: {
    marginTop: 40,
    alignSelf: "center",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    minHeight: 40,
  },
  header: {
    backgroundColor: "#004E92",
    borderColor: "#004E92",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  headerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 8,
    textAlign: "center",
  },
  cell: {
    paddingHorizontal: 8,
    fontSize: 14,
    color: "#222",
    textAlign: "center",
  },
  evenRow: {
    backgroundColor: "#F9F9F9",
  },
  oddRow: {
    backgroundColor: "white",
  },
});
