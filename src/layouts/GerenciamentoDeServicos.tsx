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
import { GerenciamentoServicosPropsNav } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";

type Servico = {
  id: string;
  nomeServico: string;
  horaServico: string;
  dataServico: string;
  observacoes: string;
  nomeAnimal: string; // Adicionado nomeAnimal
};

const GerenciamentoDeServicos = (props: GerenciamentoServicosPropsNav) => {
  const [servicos, setServicos] = useState<Servico[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection("servicos")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            nomeServico: typeof d.nomeServico === "string" ? d.nomeServico : "",
            horaServico: typeof d.horaServico === "string" ? d.horaServico : "",
            dataServico: typeof d.dataServico === "string" ? d.dataServico : "",
            observacoes: typeof d.observacoes === "string" ? d.observacoes : "",
            nomeAnimal: typeof d.nomeAnimal === "string" ? d.nomeAnimal : "",
          } as Servico;
        });

        data.sort((a, b) => a.nomeServico.localeCompare(b.nomeServico));
        setServicos(data);
      });

    return () => subscribe();
  }, []);

  const navegarParaAlterar = (servico: Servico) => {
    props.navigation.navigate("AlterarServicos", { servico });
  };

  return (
    <LinearGradient
      colors={["#a2c4f9", "#6fa8dc", "#3c78d8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.tela, { justifyContent: "flex-start", padding: 12 }]}
    >
      <Text style={styles.tituloTela}>Serviços Agendados</Text>

      <View style={styles_local.tabelaContainer}>
        <View style={[styles_local.row, styles_local.header]}>
          <Text
            style={[styles_local.cell, styles_local.headerText, { flex: 1 }]}
          >
            #
          </Text>
          <Text
            style={[styles_local.cell, styles_local.headerText, { flex: 3 }]}
          >
            Nome
          </Text>
          <Text
            style={[styles_local.cell, styles_local.headerText, { flex: 3 }]}
          >
            Animal
          </Text>
          <Text
            style={[styles_local.cell, styles_local.headerText, { flex: 2 }]}
          >
            Data
          </Text>
          <Text
            style={[styles_local.cell, styles_local.headerText, { flex: 2 }]}
          >
            Hora
          </Text>
        </View>

        <FlatList
          data={servicos}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ItemServico
              ordem={index + 1}
              servico={item}
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

type ItemServicoProps = {
  servico: Servico;
  isEven: boolean;
  ordem: number;
  onPress: () => void;
};

const ItemServico = ({ servico, ordem, isEven, onPress }: ItemServicoProps) => {
  // Função para garantir que o conteúdo é string segura para Text
  const safeText = (value: unknown) =>
    typeof value === "string" ? value : "";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={[
        styles_local.row,
        isEven ? styles_local.evenRow : styles_local.oddRow,
      ]}
    >
      <Text style={[styles_local.cell, { flex: 1 }]}>{ordem}</Text>
      <Text style={[styles_local.cell, { flex: 3 }]} numberOfLines={1}>
        {safeText(servico.nomeServico)}
      </Text>
      <Text style={[styles_local.cell, { flex: 3 }]} numberOfLines={1}>
        {safeText(servico.nomeAnimal)}
      </Text>
      <Text style={[styles_local.cell, { flex: 2 }]}>
        {safeText(servico.dataServico)}
      </Text>
      <Text style={[styles_local.cell, { flex: 2 }]}>
        {safeText(servico.horaServico)}
      </Text>
    </TouchableOpacity>
  );
};

export default GerenciamentoDeServicos;

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
