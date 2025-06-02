import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewPostScreen from '../screens/newPost/NewPostScreen';

const Stack = createNativeStackNavigator();

const ScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="new-post"
        component={NewPostScreen}
        options={{title: 'New Post'}}
      />
    </Stack.Navigator>
  );
};

export default ScreenNavigator;

const styles = StyleSheet.create({});
