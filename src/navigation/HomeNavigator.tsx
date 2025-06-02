import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ForYouScreen from '../screens/home/ForYouScreen';
import FollowingScreen from '../screens/home/FollowingScreen';
import {HomeParamList} from '../types/navigation.types';
import {theme} from '../constants/colors';

const Tab = createMaterialTopTabNavigator<HomeParamList>();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: theme.primary},
        tabBarPressColor: 'rgba(0,0,0,0.05)',
      }}>
      <Tab.Screen
        name="forYou"
        component={ForYouScreen}
        options={{title: 'For you'}}
      />
      <Tab.Screen name="Following" component={FollowingScreen} />
    </Tab.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({});
