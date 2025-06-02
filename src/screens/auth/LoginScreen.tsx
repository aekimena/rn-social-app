import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {theme} from '../../constants/colors';
import {_styles} from '../../constants/styles';
import {CustomInput} from '../../components/inputs/CustomInput';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../types/navigation.types';
import {useUserStore} from '../../store/userStore';
import {useAuthStore} from '../../store/authStore';
import {useMutation} from '@tanstack/react-query';
import api from '../../api';

const LoginScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'login'>;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useUserStore();
  const {setToken} = useAuthStore();

  const {isPending, mutateAsync} = useMutation({
    mutationFn: async () => {
      const response = await api.post(`/auth/login`, {email, password});
      return response.data;
    },
    onSuccess(data, variables, context) {
      setUser(data.data);
      setToken(data.token);
    },
    onError(error, variables, context) {
      Alert.alert('Login Error!');
    },
  });

  function login() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password || password.length < 6) return;

    if (!emailRegex.test(email)) return;
    mutateAsync();
  }
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 20, gap: 20}}>
        <CustomInput
          onChangeText={setEmail}
          label="Email"
          placeholder="Eg aekimena@gmail.com"
        />
        <CustomInput label="Password" onChangeText={setPassword} secured />
        <Button title="Login" onPress={login} />
      </View>
      <View
        style={{position: 'absolute', bottom: 0, width: '100%', padding: 20}}>
        <Text
          style={{textAlign: 'center'}}
          onPress={() => navigation.navigate('signup')}>
          Don't have an account? Sign up
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: 'center',
  },
});
