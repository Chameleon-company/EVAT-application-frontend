import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const CreateAccountScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm<SignUpFormValues>();
  const password = watch('password');

  const onSubmit = (data: SignUpFormValues) => {
    console.log('Sign Up Data:', data);
    // Handle account creation logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
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
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          validate: value => value === password || 'Passwords do not match',
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
      <Button title="Back to Log In" onPress={() => navigation.goBack()} />
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

export default CreateAccountScreen;