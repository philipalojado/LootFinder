import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from './firebaseConfig.js';
import { FontAwesome } from '@expo/vector-icons';

const backgroundImage = require('./1.png');
const LogoImage = require('./4.png'); // Replace with your logo path

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const auth = getAuth(app);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Navigate to the Login screen upon successful registration
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration failed', error.message);
      // Handle registration error
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Image source={LogoImage} style={styles.logo} />
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <FontAwesome name="envelope" size={24} color="white" style={styles.icon} />
            </View>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={[styles.input, styles.textInput]}
              keyboardType="email-address"
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <FontAwesome name="lock" size={24} color="white" style={styles.icon} />
            </View>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              style={[styles.input, styles.textInput]}
              secureTextEntry
              placeholderTextColor="white"
            />
          </View>
          <TouchableOpacity
            onPress={handleRegister}
            style={[styles.button, styles.touchableOpacity]}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 100, // Adjust the width to fit your logo
    height: 100, // Adjust the height to fit your logo
    marginBottom: 20, // Adjust the spacing between the logo and the inputs
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  iconContainer: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: 'white',
  },
  textInput: {
    borderColor: 'transparent',
  },
  icon: {},
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
  },
  touchableOpacity: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default RegisterScreen;
