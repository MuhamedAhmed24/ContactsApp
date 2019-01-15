

// all navigation root will find it here


import React, { Component } from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator, createSwitchNavigator, createAppContainer, createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Api from '../screens/Api';
import Add from '../screens/Add';
import Info from '../screens/Info';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';


// get device type to choose the best icon for it
const deviceIcon = Platform.OS === 'ios' ? 'ios' : 'md';


// Friends page Stack
const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
  },
  Add: {
    screen: Add,
  },
  Info: {
    screen: Info,
  },
}, {
  // mode: 'modal',
  headerMode: 'none',
});

// the TabBar Stack
const AppStack = createBottomTabNavigator({
  Friends: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Friends',
      tabBarIcon: ({ tintColor }) => (
        <Icon name={`${deviceIcon}-person-add`} size={20} color="#2068db" />
      ),
    },
  },
  API: {
    screen: Api,
    navigationOptions: {
      tabBarLabel: 'API',

      tabBarIcon: ({ tintColor }) => (
        <Icon name={`${deviceIcon}-information-circle`} size={20} color="#2068db" />
      ),
    },
  },
}, {
  headerMode: 'none',
});

// login stack
const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
  },
}, {
  headerMode: 'none',
});

// first login stack navigator
const MainRoot = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
export default createAppContainer(MainRoot);
