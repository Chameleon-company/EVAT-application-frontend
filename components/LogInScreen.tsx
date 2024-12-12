import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { loginUser } from './apiService';

// Very basic create profile screen
interface LoginFormValues {
  email: string;
  password: string;
}


const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }): React.ReactElement => {

  const { control, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginUser(data.email, data.password);
      console.log('Login Successful:', response);
      // Navigate or store token
    } catch (error) {

      if (error instanceof AxiosError && error.response && error.response.data) {
        console.error('Login Failed:', error.response.data);
      } else if (error instanceof Error) {
        console.error('Login Failed:', error.message);
      } else {
        console.error('Login Failed:', error);
      }

    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Email is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Button title="Log In" onPress={handleSubmit(onSubmit)} />
      <Button title="Create Account" onPress={() => navigation.navigate('CreateAccount')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});


export default LoginScreen;

