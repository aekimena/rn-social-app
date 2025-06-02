import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {theme} from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {screens} from '../../navigation/screens';

export const NewPostButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{paddingRight: 20}}
      onPress={() => {
        navigation.navigate(screens.screenNav, {screen: screens.newPost});
      }}>
      <Text style={{fontSize: 16, color: theme.primary}}>New post</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
