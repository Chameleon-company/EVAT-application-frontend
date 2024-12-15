import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { loginUser, userLogin } from './../apiService';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }): React.ReactElement => {
  const [token, setToken] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<LoginFormValues>();
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  const handleLogin = async (data: LoginFormValues) => {
    if (email == "") {
      Alert.alert(
        'Error',
        'Email is Required',
        [
        ],
        {
          cancelable: true,
        },
      );
      return
    }
    if (pwd == "") {
      Alert.alert(
        'Error',
        'Password is Required',
        [
        ],
        {
          cancelable: true,
        },
      );
      return
    }
    try {
      const response = await userLogin({
        email: email,
        password: pwd
      });
      if (response?.data?.accessToken?.accessToken) {
        await AsyncStorage.setItem('userToken', response?.data?.accessToken?.accessToken);
        console.log('Login Successful:', response);
        navigation.navigate('Map');
        // Alert.alert( 'Sign up Success', '', [ ],
        //     {
        //       cancelable: true,
        //       onDismiss: () =>{
        //         // set token
        //         navigation.navigate('Map');
        //       }
        //     },
        // );
      } else {

        console.log('Login error:', response);
      }

      // Navigate or store token
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        console.error('Login Failed:', error.response.data);
        Alert.alert(
          'Error',
          (error?.response?.data?.message || 'Network Error'),
          [
          ],
          {
            cancelable: true,
          },
        );
      } else if (error instanceof Error) {
        console.error('Login Failed:', error.message);
      } else {
        console.error('Login Failed:', error);
      }
    }
  };
  const handleSignup = () => {
    console.log('handleSignup-->:', navigation);
    navigation.navigate('CreateAccount');
  };
  const handleTest = () => {
    console.log('handleTest-->:', navigation);
    navigation.navigate('AddCard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <View style={[styles.logoImg, styles.logo1]}>
          <Image source={require('../../assets/login/a1.png')} style={styles.logoImage} />
        </View>
        <View style={[styles.logoImg, styles.logo2]}>
          <Image source={require('../../assets/login/a2.png')} style={styles.logoImage} />
        </View>
        <View style={[styles.logoImg, styles.logo3]}>
          <Image source={require('../../assets/login/a3.png')} style={styles.logoImage} />
        </View>
      </View>
      <Text style={styles.title}>
        Unlock access to all charging stations with just a free account!
      </Text>


      <View style={styles.inpBox}>

        <View style={styles.inp}>
          <Image source={require('../../assets/login/b2.png')} style={styles.icon} />
          <TextInput keyboardType="default" value={email} maxLength={50} onChangeText={setEmail} placeholder="Email" style={styles.input} />
        </View>
        <View style={styles.inp}>
          <Image source={require('../../assets/login/b3.png')} style={styles.icon} />
          <TextInput keyboardType="default" value={pwd} maxLength={50} onChangeText={setPwd} placeholder="Password" style={styles.input} secureTextEntry />
        </View>
      </View>
      <TouchableOpacity style={styles.signinBtn} onPress={handleLogin}>
        <Text style={styles.nextText}>Sign In</Text>
      </TouchableOpacity>


      <View style={styles.btns}>
        <TouchableOpacity style={styles.btn}>
          <Image source={require('../../assets/login/a4.png')} style={styles.btnIcon} />
          {/* <Text style={styles.btnText}>Sign In With Apple ID</Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image source={require('../../assets/login/a5.png')} style={styles.btnIcon} />
          {/* <Text style={styles.btnText}>Sign In With Microsoft Account</Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Image source={require('../../assets/login/a6.png')} style={styles.btnIcon} />
          {/* <Text style={styles.btnText}>Sign In With Google</Text> */}
        </TouchableOpacity>
      </View>

      <Text style={styles.newHere}>New here? Sign up now</Text>
      <TouchableOpacity onPress={handleSignup} style={styles.signupBtn}>
        <Text style={styles.signup}>Sign up!</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={handleTest} style={styles.signupBtn}>
        <Text style={styles.signup}>go test</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgb(207, 249, 255)',
  },
  logo: {
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoImg: {
    width: 100,
    height: 100,
    position: 'absolute',
    overflow: 'hidden',
  },
  logo1: {
    left: '50%',
    top: 10,
    marginLeft: -20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
  },
  logo2: {
    left: '15%',
    top: 60,
    marginLeft: -10,
    borderRadius: 50,
  },
  logo3: {
    right: '15%',
    top: 20,
    borderRadius: 50,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  formbox: {

  },
  title: {
    color: '#2293B7',
    fontSize: 25,
    fontWeight: '600',
    marginVertical: 20,
    textAlign: 'center',
  },
  btns: {
    marginTop: 10,
    marginBottom: 40,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: 'row',
  },
  btn: {
    flexWrap: "nowrap",
    backgroundColor: '#2293B7',
    marginBottom: 15,
    padding: 5,
    borderRadius: 50,
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  btnIcon: {
    alignSelf: "flex-start",
    width: 30,
    height: 30,
    marginRight: 10,
  },
  btnText: {
    textAlign: 'center',
    lineHeight: 50,
    fontWeight: '600',
    color: '#fff',
  },
  newHere: {
    fontSize: 14,
    color: '#000',
    marginTop: 20,
  },
  signup: {
    color: '#2293B7',
    fontSize: 16,
  },
  signinBtn: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2293B7',
    marginBottom: 25,
    padding: 10,
    borderRadius: 30,
    width: '80%',
  },
  signupBtn: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2293B7',
    borderCurve: "circular",
    marginBottom: 15,
    padding: 10,
    borderRadius: 30,
    width: '80%',
  },
  inpBox: {
    width: '90%',
    marginTop: 30,
  },
  inp: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    borderColor: '#ccc',
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
  },
  text: {
    color: '#007AFF',
    textAlign: 'center',
    marginVertical: 10,
  },
  icon: {
    width: 36,
    height: 30,
    marginTop: 2,
    marginRight: 10,
    marginLeft: 4,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 20,
    backgroundColor: '#cff9ff',
    paddingLeft: 10,
    borderWidth: 0,
  },

});

export default LoginScreen;
