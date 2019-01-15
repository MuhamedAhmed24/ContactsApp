// / First Screen for auth the user or signup


import React, { Component } from 'react';
import {
  View, StatusBar, Text, TextInput, TouchableOpacity, StyleSheet, PermissionsAndroid, Alert,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { onSignIn } from '../config/auth';
import {
  USERS_SCHEMA, databaseOptions,
} from '../databases/allSchemas';

const Realm = require('realm');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

      userName: null,
      passWord: null,
      newPassWord: null,
      // / to change the view for currenct use state
      formType: 'login',
    };
  }


  ifCondition = () => {
    // // condition to show which view to the user Register or Login
    if (this.state.formType === 'login') {
      return (
        <View>
          <Text style={{ color: 'red', fontSize: 20 }}>
        sign in
          </Text>
          <TextInput

            style={{
              marginTop: 12,
              height: 40,
              width: 200,
              borderColor: '#fff',
              borderWidth: 1,
              backgroundColor: '#fff',
            }}
            onChangeText={text => this.setState({ userName: text })}
            placeholder="username"
          />
          <TextInput
            secureTextEntry
            style={{
              marginTop: 20, height: 40, width: 200, borderColor: '#fff', borderWidth: 1, backgroundColor: '#fff',
            }}
            onChangeText={text => this.setState({ passWord: text })}
            placeholder="password"
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={this.handleLogin}>
              <View style={{
                marginTop: 12,
                flexDirection: 'row',
                width: 100,
                justifyContent: 'space-around',
                alignItems: 'center',
                height: 30,
                borderRadius: 4,
                backgroundColor: '#C53829',
              }}
              >
                <Text style={{ fontSize: 20, color: '#fff' }}>Sign in</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => { this.setState({ formType: 'signup' }); }}>
              <View style={{
                marginTop: 12,
                flexDirection: 'row',
                width: 100,
                justifyContent: 'space-around',
                alignItems: 'center',
                height: 30,
                borderRadius: 4,
                backgroundColor: '#C53829',
                marginLeft: 10,
              }}
              >
                <Text style={{ fontSize: 20, color: '#fff' }}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      );
    } if (this.state.formType === 'signup') {
      return (
        <View>
          <Text style={{ color: 'red', fontSize: 20 }}>
        new user signup
          </Text>
          <TextInput

            style={{
              marginTop: 12,
              height: 40,
              width: 200,
              borderColor: '#fff',
              borderWidth: 1,
              backgroundColor: '#fff',
            }}
            onChangeText={text => this.setState({ userName: text })}
            placeholder="username"

          />
          <TextInput
            secureTextEntry
            style={{
              marginTop: 20, height: 40, width: 200, borderColor: '#fff', borderWidth: 1, backgroundColor: '#fff',
            }}
            onChangeText={text => this.setState({ passWord: text })}
            placeholder="password"

          />
          <TextInput
            secureTextEntry
            style={{
              marginTop: 20, height: 40, width: 200, borderColor: '#fff', borderWidth: 1, backgroundColor: '#fff',
            }}
            onChangeText={text => this.setState({ newPassWord: text })}
            placeholder="Rewrite password"
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={this.handleSignUp}>
              <View style={{
                marginTop: 12,
                flexDirection: 'row',
                width: 100,
                justifyContent: 'space-around',
                alignItems: 'center',
                height: 30,
                borderRadius: 4,
                backgroundColor: '#C53829',
              }}
              >
                <Text style={{ fontSize: 20, color: '#fff' }}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => { this.setState({ formType: 'login' }); }}>
              <View style={{
                marginTop: 12,
                flexDirection: 'row',
                width: 100,
                justifyContent: 'space-around',
                alignItems: 'center',
                height: 30,
                borderRadius: 4,
                backgroundColor: '#C53829',
                marginLeft: 10,

              }}
              >
                <Text style={{ fontSize: 20, color: '#fff' }}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>


        </View>
      );
    }
  }

  // // handling signup function some simple validation and then save record in database
    handleSignUp = () => {
      // simple validation
      if (this.state.userName === null || this.state.passWord === null || this.state.newPassWord === null) {
        Alert.alert('Check ur inputs');
      } else if (this.state.passWord === this.state.newPassWord) {
        // after validation we save the user info
        Realm.open(databaseOptions).then((realm) => {
          realm.write(() => {
            realm.create(USERS_SCHEMA, {
              userId: Math.floor(Math.random() * 10000) + 1,
              userName: this.state.userName,
              passWord: this.state.passWord,
            });
          });
          // // save userName to Storage
          onSignIn(this.state.userName);
          // / then navifate it to homepage  Home
          this.props.navigation.navigate('Friends');
        }).catch((error) => {
          Alert.alert('Check your Inputs!');
        });
      } else {
        Alert.alert('match ur pass');
      }
    }
    // // handling login function some simple validation

  handleLogin = () => {
    Realm.open(databaseOptions)
      .then((realm) => {
        const userInfo = realm.objects(USERS_SCHEMA).filtered(`userName = "${this.state.userName}"`);
        if (userInfo[0].passWord === this.state.passWord) {
          onSignIn(this.state.userName);
          this.props.navigation.navigate('Friends');
        } else {
          Alert.alert('Faild to login!');
        }
      }).catch((error) => {
        Alert.alert('Check your Inputs!');
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {
          // use this only to get the path for the realm database to show it or edit on its tables
         // console.log(Realm.defaultPath)

        }

        <StatusBar translucent={false} barStyle="light-content" />
        {this.ifCondition()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

export default Login;
