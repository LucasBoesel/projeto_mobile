import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Lobby: undefined;
  Login: undefined;
  ClienteCadastro: undefined;
};

type LobbyScreenProps = NativeStackNavigationProp<RootStackParamList, 'Lobby'>;

const LobbyScreen = () => {
  const navigation = useNavigation<LobbyScreenProps>();

  return (
    <LinearGradient
      colors={['#a2c4f9', '#6fa8dc', '#3c78d8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <View style={styles.card}>
        {/* Título agora é apenas texto, sem TouchableOpacity */}
        <Text style={styles.title}>🐾 PetShop Cantinho Animal</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonCadastrar]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ClienteCadastro')}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footer}>© 2025 Cantinho Animal</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 30,
    paddingVertical: 60,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#2f4171',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 14,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: 'black',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 8,
    marginBottom: 60,
    textAlign: 'center',
  },
  buttonGroup: {
    width: '100%',
  },
  button: {
    height: 70,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#37589b',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.18,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  buttonCadastrar: {
    backgroundColor: '#2E7D32',
  },
  buttonText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  footer: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'italic',
    marginTop: 40,
  },
});

export default LobbyScreen;
export type { LobbyScreenProps };
