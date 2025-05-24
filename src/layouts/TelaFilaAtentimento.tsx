import { useState, useEffect } from "react";
import { Alert, Pressable, FlatList, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { TelaFilaAtentimentoPropsNav } from "../navigation/HomeNavigator";
import { styles } from "../styles/styles";

// Tipo do paciente
type Paciente = {
    id: string;
    nome: string;
    idade: string;
    descricao: string;
    grau: string;
};

const TelaFilaAtendimento = (props: TelaFilaAtentimentoPropsNav) => {
    const [pacientes, setPacientes] = useState<Paciente[]>([]);

    useEffect(() => {
        const subscribe = firestore()
            .collection('fila_atendimento')
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Paciente[];

                setPacientes(data);
            });

        return () => subscribe();
    }, []);

    return (
        <View style={[styles.tela, { justifyContent: 'center' }]}>
            <Text style={styles.tituloTela}>Fila de Atendimento</Text>
            <FlatList
                data={pacientes}
                keyExtractor={(item) => item.id}
                renderItem={(info) => (
                    <ItemPaciente
                        numeroOrdem={info.index + 1}
                        paciente={info.item}
                    />
                )}
            />
            <View style={styles.centralizar}>
                <Pressable
                    style={[styles.botao_voltar_consulta, { width: '40%' }]}
                    onPress={() => props.navigation.navigate('FormularioCadastro')}>
                    <Text style={styles.texto_botao}>Voltar</Text>
                </Pressable>
            </View>
        </View>
    );
};

type ItemPacienteProps = {
    numeroOrdem: number;
    paciente: Paciente;
};

const grauToTextoECor = (grau: string) => {
    switch (grau) {
        case "1":
            return { texto: "Leve", cor: "blue" };
        case "2":
            return { texto: "Menos Graves", cor: "green" };
        case "3":
            return { texto: "Urgência", cor: "yellow" };
        case "4":
            return { texto: "Muita Urgência", cor: "orange" };
        case "5":
            return { texto: "Emergência", cor: "red" };
        default:
            return { texto: "Desconhecido", cor: "gray" };
    }
};

const ItemPaciente = (props: ItemPacienteProps) => {
    const { texto, cor } = grauToTextoECor(props.paciente.grau);

    return (
        <View style={[styles.card, styles_local.cardContainer]}>
            <View style={styles_local.dados_card}>
                <Text style={styles_local.nomePaciente}>
                    {props.paciente.nome}
                </Text>

                
                <Text style={styles_local.dadoPaciente}>Idade: {props.paciente.idade}</Text>

                
                <Text style={styles_local.dadoPaciente}>Descrição: {props.paciente.descricao}</Text>

               
                <Text style={[styles_local.grauPaciente, { color: cor }]}>
                    Grau: {texto}
                </Text>
            </View>
        </View>
    );
};

export default TelaFilaAtendimento;

const styles_local = StyleSheet.create({
    cardContainer: {
        marginBottom: 10, 
        backgroundColor: '#fff', 
        borderRadius: 10,   
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        top: 40,
    },
    dados_card: {
        flex: 1,
    },
    nomePaciente: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dadoPaciente: {
        fontSize: 14,
        marginBottom: 5,
    },
    grauPaciente: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});