import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { MenuPropsNav } from '../navigation/HomeNavigator';

const { width } = Dimensions.get('window');

const Menu = ({ route, navigation }: MenuPropsNav) => {
  const { clienteId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const navigateTo = (
  screen: 'ClienteCadastro' | 'CadastroDeServico' | 'AnimalCadastro' | 'CadastroProduto'
) => {
  closeModal();

  if (screen === 'CadastroDeServico' || screen === 'AnimalCadastro' || screen === 'CadastroProduto') {
    navigation.navigate(screen, { clienteId });
  } else {
    navigation.navigate(screen);
  }
};

  const handleLogout = () => {
    closeModal();
    navigation.navigate('Lobby');
  };

  const botoes: Array<{
    label: string;
    screen: 'ClienteCadastro' | 'CadastroDeServico' | 'AnimalCadastro' | 'CadastroProduto';
  }> = [
    { label: 'Cadastro de Cliente', screen: 'ClienteCadastro' },
    { label: 'Cadastro de Serviço', screen: 'CadastroDeServico' },
    { label: 'Cadastro de Animal', screen: 'AnimalCadastro' },
    { label: 'Cadastro de Produto', screen: 'CadastroProduto' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.iconButton} activeOpacity={0.8}>
        <Text style={styles.iconText}>⋮</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.header}>Olá, seja bem-vindo</Text>
        <Text style={styles.subHeader}>
          Cliente ID: <Text style={styles.highlight}>{clienteId}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          {botoes.map(({ label, screen }) => (
            <TouchableOpacity
              key={screen}
              style={styles.button}
              activeOpacity={0.85}
              onPress={() => navigateTo(screen)}
            >
              <Text style={styles.buttonText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Modal */}
    <Modal
  animationType="fade"
  transparent
  visible={modalVisible}
  onRequestClose={closeModal}
>
  <Pressable style={styles.modalOverlay} onPress={closeModal}>
    <View style={styles.modalContainer}>
      
      {/* Botão para Gerenciamento de Clientes */}
      <TouchableOpacity
        style={styles.modalItem}
        onPress={() => {
          closeModal();
          navigation.navigate('GerenciamentoClientes');
        }}
      >
        <Text style={styles.modalText}>Clientes</Text>
      </TouchableOpacity>

      {/* Botão para Gerenciamento de Animais */}
      <TouchableOpacity
        style={styles.modalItem}
        onPress={() => {
          closeModal();
          navigation.navigate('GerenciamentoDeAnimais');
        }}
      >
        <Text style={styles.modalText}>Animais</Text>
      </TouchableOpacity>

      {/* Botão para Gerenciamento de Serviços */}
      <TouchableOpacity
        style={styles.modalItem}
        onPress={() => {
          closeModal();
          navigation.navigate('GerenciamentoDeServicos');
        }}
      >
        <Text style={styles.modalText}>Serviços</Text>
      </TouchableOpacity>

      {/* Botão de Sair */}
      <TouchableOpacity style={styles.modalItem} onPress={handleLogout}>
        <Text style={[styles.modalText, { color: '#D32F2F', fontWeight: '700' }]}>
          Sair
        </Text>
      </TouchableOpacity>

    </View>
  </Pressable>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  iconButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
  },
  iconText: {
    fontSize: 40,
    color: '#3B82F6',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0D47A1',
    marginBottom: 12,
  },
  subHeader: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 40,
  },
  highlight: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 20,
    width: width * 0.9,
    borderRadius: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  modalContainer: {
    marginTop: 70,
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: width * 0.7,
    elevation: 10,
  },
  modalItem: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  modalText: {
    fontSize: 16,
    color: '#1F2937',
  },
});

export default Menu;