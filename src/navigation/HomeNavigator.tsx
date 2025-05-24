import React from 'react';
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import LobbyScreen from "../layouts/Lobby";
import Login from '../layouts/Login';
import Menu from '../layouts/Menu';

import CadastroDeServico from '../layouts/CadastroDeServiço';
import ClienteCadastro from "../layouts/ClienteCadastro";
import AnimalCadastro from '../layouts/AnimalCadastro';
import CadastroProduto from '../layouts/CadastroProduto';

import TelaGerenciamentoClientes from '../layouts/GerenciamentoDeClientes';
import GerenciamentoDeAnimais from '../layouts/GerenciamentoDeAnimais';
import GerenciamentoDeServicos from '../layouts/GerenciamentoDeServicos';

import AlterarClientes from '../layouts/AlterarClientes';
import AlterarAnimais from '../layouts/AlterarAnimais';
import AlterarServicos from '../layouts/AlterarServicos';

import { Cliente } from '../types/Cliente';
import { Animal } from '../types/Animal';
import { Servico } from '../types/Servico'; // ⬅️ Adicione isso

// ✅ Tipagem dos parâmetros da navegação
export type RootStackParamList = {
  Lobby: undefined;
  ClienteCadastro: undefined;
  Login: undefined;
  Menu: { clienteId: string };
  CadastroDeServico: { clienteId: string };
  CadastroProduto: { clienteId: string };
  AnimalCadastro: { clienteId: string };
  GerenciamentoClientes: undefined;
  GerenciamentoDeAnimais: undefined;
  GerenciamentoDeServicos: undefined;
  AlterarClientes: { cliente: Cliente };
  AlterarAnimais: { animal: Animal };
  AlterarServicos: { servico: Servico };

};

// ✅ Criando o navegador
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Lobby" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Lobby" component={LobbyScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="CadastroDeServico" component={CadastroDeServico} />
      <Stack.Screen name="CadastroProduto" component={CadastroProduto} />
      <Stack.Screen name="ClienteCadastro" component={ClienteCadastro} />
      <Stack.Screen name="AnimalCadastro" component={AnimalCadastro} />
      <Stack.Screen name="GerenciamentoClientes" component={TelaGerenciamentoClientes} />
      <Stack.Screen name="GerenciamentoDeAnimais" component={GerenciamentoDeAnimais} />
      <Stack.Screen name="GerenciamentoDeServicos" component={GerenciamentoDeServicos} />
      <Stack.Screen name="AlterarClientes" component={AlterarClientes} />
      <Stack.Screen name="AlterarAnimais" component={AlterarAnimais} />
      <Stack.Screen name="AlterarServicos" component={AlterarServicos} />

    </Stack.Navigator>
  );
};

// ✅ Tipos de props para cada tela (opcional, mas útil)
type LobbyProps = NativeStackScreenProps<RootStackParamList, 'Lobby'>;
type CadClientePropsNav = NativeStackScreenProps<RootStackParamList, 'ClienteCadastro'>;
type LoginPropsNav = NativeStackScreenProps<RootStackParamList, 'Login'>;
type MenuPropsNav = NativeStackScreenProps<RootStackParamList, 'Menu'>;
type CadDeServicoNav = NativeStackScreenProps<RootStackParamList, 'CadastroDeServico'>;
type AnimalCadPropsNav = NativeStackScreenProps<RootStackParamList, 'AnimalCadastro'>;
type GerenciamentoClientesPropsNav = NativeStackScreenProps<RootStackParamList, 'GerenciamentoClientes'>;
type AlterarClientesPropsNav = NativeStackScreenProps<RootStackParamList, 'AlterarClientes'>;
type CadastroProdutoPropsNav = NativeStackScreenProps<RootStackParamList, 'CadastroProduto'>;
type GerenciamentoAnimaisPropsNav = NativeStackScreenProps<RootStackParamList, 'GerenciamentoDeAnimais'>;
type GerenciamentoServicosPropsNav = NativeStackScreenProps<RootStackParamList, 'GerenciamentoDeServicos'>;
type AlterarAnimaisPropsNav = NativeStackScreenProps<RootStackParamList, 'AlterarAnimais'>;
type AlterarServicosPropsNav = NativeStackScreenProps<RootStackParamList, 'AlterarServicos'>;
export default HomeNavigator;

export type {
  LobbyProps,
  CadClientePropsNav,
  LoginPropsNav,
  MenuPropsNav,
  CadDeServicoNav,
  AnimalCadPropsNav,
  GerenciamentoClientesPropsNav,
  GerenciamentoAnimaisPropsNav,
  GerenciamentoServicosPropsNav,
  AlterarClientesPropsNav,
  CadastroProdutoPropsNav,
  AlterarAnimaisPropsNav,
  AlterarServicosPropsNav,
};
