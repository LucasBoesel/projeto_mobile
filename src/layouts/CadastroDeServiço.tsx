import React, { useState, useEffect } from 'react';
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
import { Picker } from '@react-native-picker/picker'; // npm install @react-native-picker/picker

const servicosPredefinidos = [
  'Banho',
  'Tosa',
  'Consulta Veterinária',
  'Vacinação',
  'Consulta Nutricional',
];

const CadastroDeServico = (props: any) => {
  const { clienteId } = props.route.params;

  const [nomeServico, setNomeServico] = useState('');
  const [dataServico, setDataServico] = useState('');
  const [horaServico, setHoraServico] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [animais, setAnimais] = useState<Array<{ id: string; nomeAnimal: string }>>([]);
  const [animalSelecionado, setAnimalSelecionado] = useState<string>('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('animais')
      .where('clienteId', '==', clienteId)
      .onSnapshot(snapshot => {
        const lista = snapshot.docs.map(doc => ({
          id: doc.id,
          nomeAnimal: doc.data().nomeAnimal,
        }));
        setAnimais(lista);
        if (lista.length > 0) setAnimalSelecionado(lista[0].id);
      }, error => {
        console.log('Erro ao buscar animais:', error);
      });

    return () => unsubscribe();
  }, [clienteId]);

  // Validações de data e hora
  const validarData = (data: string): boolean => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = data.match(regex);
    if (!match) return false;

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10) - 1;
    const ano = parseInt(match[3], 10);

    if (ano < 2020 || ano > 2100) return false;

    const dataObj = new Date(ano, mes, dia);
    return (
      dataObj.getFullYear() === ano &&
      dataObj.getMonth() === mes &&
      dataObj.getDate() === dia
    );
  };

  const validarHora = (hora: string): boolean => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(hora);
  };

  const validarDataHoraFutura = (data: string, hora: string): boolean => {
    if (!validarData(data) || !validarHora(hora)) return false;

    const [diaStr, mesStr, anoStr] = data.split('/');
    const [horaStr, minutoStr] = hora.split(':');

    const dia = parseInt(diaStr, 10);
    const mes = parseInt(mesStr, 10) - 1;
    const ano = parseInt(anoStr, 10);
    const horaNum = parseInt(horaStr, 10);
    const minutoNum = parseInt(minutoStr, 10);

    const dataHoraAgendada = new Date(ano, mes, dia, horaNum, minutoNum, 0, 0);
    const agora = new Date();

    return dataHoraAgendada >= agora;
  };

  const cadastrarServico = async () => {
    if (!nomeServico) {
      Alert.alert('Erro', 'Por favor, selecione um serviço.');
      return;
    }
    if (!dataServico || !horaServico) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (!animalSelecionado) {
      Alert.alert('Erro', 'Por favor, selecione um animal.');
      return;
    }

    if (!validarData(dataServico)) {
      Alert.alert('Erro', 'Informe uma data válida (DD/MM/AAAA).');
      return;
    }

    if (!validarHora(horaServico)) {
      Alert.alert('Erro', 'Informe uma hora válida no formato HH:MM.');
      return;
    }

    if (!validarDataHoraFutura(dataServico, horaServico)) {
      Alert.alert('Erro', 'A data e hora devem ser iguais ou posteriores ao momento atual.');
      return;
    }

    try {
      // Buscar o nome do animal pelo id selecionado
      const animal = animais.find(a => a.id === animalSelecionado);
      const nomeAnimal = animal ? animal.nomeAnimal : '';

      await firestore()
        .collection('servicos')
        .add({
          nomeServico,
          dataServico,
          horaServico,
          observacoes,
          clienteId,
          animalId: animalSelecionado,
          nomeAnimal,  // Aqui está o nome do animal adicionado
          criadoEm: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Sucesso', 'Serviço agendado com sucesso!');
      props.navigation.goBack();
    } catch (error) {
      console.error('Erro ao agendar serviço:', error);
      Alert.alert('Erro', 'Não foi possível agendar o serviço. Tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#FFEBEE' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <Text style={styles.title}>🗓️ Agendar Serviço</Text>

        <Text style={styles.label}>Selecione o Serviço:</Text>
        <View style={styles.servicosLista}>
          {servicosPredefinidos.map((servico) => (
            <TouchableOpacity
              key={servico}
              style={[
                styles.servicoBotao,
                nomeServico === servico && styles.servicoBotaoSelecionado,
              ]}
              onPress={() => setNomeServico(servico)}
            >
              <Text
                style={[
                  styles.servicoTexto,
                  nomeServico === servico && styles.servicoTextoSelecionado,
                ]}
              >
                {servico}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Selecione o Animal:</Text>
        {animais.length > 0 ? (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={animalSelecionado}
              onValueChange={(itemValue) => setAnimalSelecionado(itemValue)}
              style={styles.picker}
              dropdownIconColor="#D32F2F"
            >
              {animais.map((animal) => (
                <Picker.Item
                  key={animal.id}
                  label={animal.nomeAnimal}
                  value={animal.id}
                />
              ))}
            </Picker>
          </View>
        ) : (
          <Text style={{ color: '#D32F2F', marginBottom: 16 }}>
            Nenhum animal encontrado para este cliente.
          </Text>
        )}

        <Text style={styles.label}>Data do Serviço:</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#888"
          value={dataServico}
          onChangeText={setDataServico}
          keyboardType="default"
        />

        <Text style={styles.label}>Hora do Serviço:</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          placeholderTextColor="#888"
          value={horaServico}
          onChangeText={setHoraServico}
          keyboardType="default"
        />

        <Text style={styles.label}>Observações:</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Observações adicionais"
          placeholderTextColor="#888"
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.greenButton} onPress={cadastrarServico}>
            <Text style={styles.buttonText}>Agendar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.redButton}
            onPress={() => {
              setNomeServico('');
              setDataServico('');
              setHoraServico('');
              setObservacoes('');
              if (animais.length > 0) setAnimalSelecionado(animais[0].id);
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
    alignItems: 'stretch',
    top: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#D32F2F',
    fontWeight: '600',
    marginBottom: 6,
  },
  servicosLista: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  servicoBotao: {
    backgroundColor: '#FFCDD2',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  servicoBotaoSelecionado: {
    backgroundColor: '#D32F2F',
  },
  servicoTexto: {
    color: '#D32F2F',
    fontWeight: '600',
  },
  servicoTextoSelecionado: {
    color: '#fff',
    fontWeight: '700',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D32F2F',
    borderRadius: 10,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    color: '#D32F2F',
  },
  input: {
    height: 48,
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FFCDD2',
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

export type Servico = {
  id: string;
  nomeServico: string;
  dataServico: string;
  horaServico: string;
  observacoes: string;
  animalId: string;
  nomeAnimal: string;
  criadoEm: any;
};

export default CadastroDeServico;
