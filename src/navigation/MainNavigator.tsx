import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';
import ScreenNavigator from './ScreenNavigator';
import {useSocketStore} from '../store/socket.store';
import {MainStackParamList} from '../types/navigation.types';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  const {connectSocket} = useSocketStore();

  useEffect(() => {
    connectSocket();

    setTimeout(() => {}, 500);
  }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="tabs" component={TabsNavigator} />
      <Stack.Screen name="screen-nav" component={ScreenNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
