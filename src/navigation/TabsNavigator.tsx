import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackParamList} from '../types/navigation.types';
import {Icon} from '../components/Icon';
import {theme} from '../constants/colors';
import HomeNavigator from './HomeNavigator';
import ProfileScreen from '../screens/profile/ProfileScreen';
import UsersScreen from '../screens/users/UsersScreen';
import {Text, TouchableOpacity} from 'react-native';
import {NewPostButton} from '../components/home/NewPostButton';

const Tab = createBottomTabNavigator<MainStackParamList>();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'users') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="home"
        component={HomeNavigator}
        options={{
          title: 'Home',
          headerRight: () => <NewPostButton />,
        }}
      />

      <Tab.Screen
        name="users"
        component={UsersScreen}
        options={{title: 'Add Users'}}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
