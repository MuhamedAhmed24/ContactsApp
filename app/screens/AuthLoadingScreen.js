// / intial page using it for auth the user


import React, { Component } from 'react';
import {
  View, ActivityIndicator, AsyncStorage, StatusBar,
} from 'react-native';

class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('auth-key');

      // This will switch to the App screen or Auth screen and this loading
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    render() {
      return (
        <View style={{}}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
}

export default AuthLoadingScreen;
