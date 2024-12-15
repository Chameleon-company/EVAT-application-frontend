import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { userRegister } from './../apiService';
import { AxiosError } from 'axios';
interface RegisterFormValues {
  fullname: string;
  email: string;
  password: string;
}
const CreateAccount: React.FC<{ navigation: any }> = ({ navigation }): React.ReactElement => {
  const [fullname, setFullname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const { control, handleSubmit } = useForm<RegisterFormValues>();

  const handleNext = async (data: RegisterFormValues) => {
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
      return false
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
      return false
    }
    try {
      const response = await userRegister({
        // email: "example4@deakin.edu.au",
        // password: "password123"
        fullname: fullname,
        email: email,
        password: pwd
      });
      if (response?.data?.email) {
        console.log('Register Successful:', response);
        Alert.alert('Sign up Success', '', [],
          {
            cancelable: true,
            onDismiss: () => {
              navigation.navigate('Map');
            }
          },
        );
      } else {

        console.log('Register error:', response);
      }




      // Navigate or store token
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        console.error('Register Failed:', error.response.data);
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
        console.error('Register Failed:', error.message);
      } else {
        console.error('Register Failed:', error);
      }
    }
  };



  return (
    <View style={styles.createAccount}>
      <View style={styles.he100} />
      <Image source={require('../../assets/login/b1.png')} style={styles.logo1} />
      <Text style={styles.title}>Create Account</Text>
      <View style={styles.inpBox}>
        <View style={styles.inp}>
          <Image source={require('../../assets/login/b4.png')} style={styles.icon} />
          <TextInput keyboardType="default" value={fullname} maxLength={50}
            onChangeText={setFullname} placeholder="FullName" style={styles.input} />
        </View>
        <View style={styles.inp}>
          <Image source={require('../../assets/login/b2.png')} style={styles.icon} />
          <TextInput keyboardType="default" value={email} maxLength={50}
            onChangeText={setEmail} placeholder="Email" style={styles.input} />
        </View>
        <View style={styles.inp}>
          <Image source={require('../../assets/login/b3.png')} style={styles.icon} />
          <TextInput keyboardType="default" value={pwd} maxLength={50}
            onChangeText={setPwd} placeholder="Password" style={styles.input} secureTextEntry />
        </View>
      </View>
      <TouchableOpacity style={styles.next} onPress={handleNext}>
        <Text style={styles.nextText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Privacy Policy</Text>
      <Text style={styles.text}>Terms & Conditions</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  createAccount: {
    flex: 1,
    height: '100%',
    backgroundColor: 'rgb(207, 249, 255)',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  he100: {
    height: 50,
  },
  logo1: {
    width: '90%',
    height: 250,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    fontFamily: 'Inknut Antiqua',
    color: '#2293B7',
    marginVertical: 20,
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
  next: {
    backgroundColor: '#2293B7',
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30,
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
});

export default CreateAccount;
