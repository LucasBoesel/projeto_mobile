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
import { GerenciamentoAnimaisPropsNav } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";

// Tipo atualizado do animal
type Animal = {
  id: string;
  nomeAnimal: string;
  observacoes: string;
  idade: string;
  tipo: string;
  raca: string;
  clienteId: string;
};

const GerenciamentoDeAnimais = (props: GerenciamentoAnimaisPropsNav) => {
  const [animais, setAnimais] = useState<Animal[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection("animais")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            nomeAnimal: d.nomeAnimal ?? '',
            observacoes: d.observacoes ?? '',
            idade: d.idade ?? '',
            tipo: d.tipo ?? '',
            raca: d.raca ?? '',
            clienteId: d.clienteId ?? '',
          };
        });

        data.sort((a, b) => a.nomeAnimal.localeCompare(b.nomeAnimal));

        setAnimais(data);
      });

    return () => subscribe();
  }, []);

  const navegarParaAlterar = (animal: Animal) => {
    props.navigation.navigate("AlterarAnimais", { animal });
  };

  return (
    <LinearGradient
      colors={["#a2c4f9", "#6fa8dc", "#3c78d8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.tela, { justifyContent: "flex-start", padding: 12 }]}
    >
      <Text style={styles.tituloTela}>Animais</Text>

      <View style={styles_local.tabelaContainer}>
        <View style={[styles_local.row, styles_local.header]}>
          <Text style={[styles_local.cell, styles_local.headerText, { flex: 1 }]}>#</Text>
          <Text style={[styles_local.cell, styles_local.headerText, { flex: 3 }]}>Nome</Text>
          <Text style={[styles_local.cell, styles_local.headerText, { flex: 2 }]}>Espécie</Text>
          <Text style={[styles_local.cell, styles_local.headerText, { flex: 3 }]}>Raça</Text>
          <Text style={[styles_local.cell, styles_local.headerText, { flex: 3 }]}>ID Cliente</Text>
        </View>

        <FlatList
          data={animais}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ItemAnimal
              ordem={index + 1}
              animal={item}
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

type ItemAnimalProps = {
  animal: Animal;
  isEven: boolean;
  ordem: number;
  onPress: () => void;
};

const ItemAnimal = ({ animal, ordem, isEven, onPress }: ItemAnimalProps) => {
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
      <Text style={[styles_local.cell, { flex: 3 }]} numberOfLines={1} ellipsizeMode="tail">{animal.nomeAnimal}</Text>
      <Text style={[styles_local.cell, { flex: 2 }]} numberOfLines={1} ellipsizeMode="tail">{animal.tipo}</Text>
      <Text style={[styles_local.cell, { flex: 3 }]} numberOfLines={1} ellipsizeMode="tail">{animal.raca}</Text>
      <Text style={[styles_local.cell, { flex: 3 }]} numberOfLines={1} ellipsizeMode="tail">{animal.clienteId}</Text>
    </TouchableOpacity>
  );
};

export default GerenciamentoDeAnimais;

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
