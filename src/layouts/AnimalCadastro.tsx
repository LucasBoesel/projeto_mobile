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
import { AnimalCadPropsNav } from '../navigation/HomeNavigator'; // ✅ Tipagem correta
import firestore from '@react-native-firebase/firestore';

const AnimalCadastro = (props: AnimalCadPropsNav) => {
    const { clienteId } = props.route.params; // Pegando o clienteId passado pela navegação

    const [nomeAnimal, setNomeAnimal] = useState('');
    const [raca, setRaca] = useState('');
    const [idade, setIdade] = useState('');
    const [tipo, setTipo] = useState('');
    const [observacoes, setObservacoes] = useState('');

    const cadastrarAnimal = async () => {
        if (!nomeAnimal || !raca || !idade || !tipo) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            await firestore()
                .collection('animais')
                .add({
                    clienteId,  // Aqui estamos associando o clienteId ao cadastro do animal
                    nomeAnimal,
                    raca,
                    idade,
                    tipo,
                    observacoes,
                    criadoEm: firestore.FieldValue.serverTimestamp(), // Data de criação
                });

            Alert.alert('Sucesso', 'Animal cadastrado com sucesso!');
            props.navigation.goBack();
        } catch (error) {
            console.error('Erro ao cadastrar animal:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar o animal. Tente novamente.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#E3F2FD' }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.cardContainer}>
                <Text style={styles.title}>🐶 Cadastro de Animal</Text>

                {/* Nome do Animal */}
                <Text style={styles.label}>Nome do Animal:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome do animal"
                    placeholderTextColor="#888"
                    value={nomeAnimal}
                    onChangeText={setNomeAnimal}
                />

                {/* Raça */}
                <Text style={styles.label}>Raça:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a raça"
                    placeholderTextColor="#888"
                    value={raca}
                    onChangeText={setRaca}
                />

                {/* Idade */}
                <Text style={styles.label}>Idade:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a idade"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    value={idade}
                    onChangeText={setIdade}
                />

                {/* Tipo */}
                <Text style={styles.label}>Tipo (Cachorro, Gato...):</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Cachorro, Gato"
                    placeholderTextColor="#888"
                    value={tipo}
                    onChangeText={setTipo}
                />

                {/* Observações */}
                <Text style={styles.label}>Observações:</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    placeholder="Observações adicionais"
                    placeholderTextColor="#888"
                    value={observacoes}
                    onChangeText={setObservacoes}
                    multiline
                />

                {/* Botões */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.greenButton} onPress={cadastrarAnimal}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.redButton}
                        onPress={() => {
                            setNomeAnimal('');
                            setRaca('');
                            setIdade('');
                            setTipo('');
                            setObservacoes('');
                        }}
                    >
                        <Text style={styles.buttonText}>Limpar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
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
        alignItems: 'stretch', // Não centralizar o conteúdo, apenas o container
        top: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1565C0',
        textAlign: 'center',
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        color: '#1565C0',
        fontWeight: '600',
        marginBottom: 6,
    },
    input: {
        height: 48,
        backgroundColor: '#E3F2FD',
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#90CAF9',
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

export default AnimalCadastro;
