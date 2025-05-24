import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, ScrollView, Pressable } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AlterarServicosPropsNav } from '../navigation/HomeNavigator';
import { Servico } from '../types/Servico';

const AlterarServicos = ({ route, navigation }: AlterarServicosPropsNav) => {
  const { servico } = route.params;
  const [nomeServico, setNomeServico] = useState(servico.nomeServico);
  const [dataServico, setDataServico] = useState(servico.dataServico);
  const [horaServico, setHoraServico] = useState(servico.horaServico);
  const [observacoes, setObservacoes] = useState(servico.observacoes || '');
  const [nomeAnimal, setNomeAnimal] = useState(servico.nomeAnimal || '');

  const salvarAlteracoes = async () => {
    if (!nomeServico || !dataServico || !horaServico || !nomeAnimal) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await firestore().collection('servicos').doc(servico.id).update({
        nomeServico,
        dataServico,
        horaServico,
        observacoes,
        nomeAnimal,
      });
      Alert.alert('Sucesso', 'Serviço alterado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao salvar alterações.');
    }
  };

  const excluirServico = async () => {
    Alert.alert('Excluir Serviço', 'Deseja mesmo excluir este serviço?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await firestore().collection('servicos').doc(servico.id).delete();
            Alert.alert('Sucesso', 'Serviço excluído com sucesso.');
            navigation.goBack();
          } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Erro ao excluir serviço.');
          }
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Alterar Serviço</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome do Serviço</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Serviço"
          value={nomeServico}
          onChangeText={setNomeServico}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome do Animal</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Animal"
          value={nomeAnimal}
          onChangeText={setNomeAnimal}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Data (DD/MM/AAAA)</Text>
        <TextInput
          style={styles.input}
          placeholder="Data (DD/MM/AAAA)"
          value={dataServico}
          onChangeText={setDataServico}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hora (HH:MM)</Text>
        <TextInput
          style={styles.input}
          placeholder="Hora (HH:MM)"
          value={horaServico}
          onChangeText={setHoraServico}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Observações"
          value={observacoes}
          onChangeText={setObservacoes}
          multiline
        />
      </View>

      <Pressable style={styles.button} onPress={salvarAlteracoes}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </Pressable>

      <Pressable style={styles.buttonDelete} onPress={excluirServico}>
        <Text style={styles.buttonText}>Excluir Serviço</Text>
      </Pressable>
    </ScrollView>
  );
};

export default AlterarServicos;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#D32F2F',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 14,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  button: {
    backgroundColor: '#66BB6A',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDelete: {
    backgroundColor: '#EF5350',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
