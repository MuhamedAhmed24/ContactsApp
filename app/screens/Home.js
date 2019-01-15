// / Friends SCreen the home page

import React, { Component } from 'react';
import {
  View, Text, TouchableHighlight, Platform, StyleSheet, StatusBar, NetInfo, FlatList, PermissionsAndroid, Alert, AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Contacts from 'react-native-contacts';
import { onSignOut } from '../config/auth';
import {
  FRIENDS_SCHEMA, databaseOptions,
} from '../databases/allSchemas';
import OfflineNotice from '../components/OfflineBar';

const Realm = require('realm');

const deviceIcon = Platform.OS === 'ios' ? 'ios' : 'md';
const underlayColor = '#eff0f2';

// /// / Row rendering component

const ListItems = ({ item, onPress }) => (
  <TouchableHighlight onPress={onPress} underlayColor="#000">
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name.replace('null', '')}</Text>
        <Text style={styles.email}>{(item.mobile === '') ? null : item.mobile}</Text>
      </View>
    </View>
  </TouchableHighlight>
);


class Home extends Component {
  constructor(props) {
    super(props);

    // initial network state
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isConnected });
    });
    this.state = {
      // save user Name here
      userName: null,
      // user's friends list
      friendsList: null,
      // use it to refresh the flatlist after adding new friend
      refresh: false,
      isLoading: true,
      // // checking connection state
      isConnected: null,
    };
  }

  componentDidMount() {
    // handling unmounted component
    this._isMounted = true;
    // Listener for checking connection state
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    // handling after closing Add Screen to refresh the parent screen (Flatlist refresh)
    this.subscribe = this.props.navigation.addListener('didFocus', () => {
      if (this._isMounted) {
        this.setState({ isLoading: false, refresh: !this.state.refresh });
      }
    });

    // / get friendslist for this user from database
    AsyncStorage.getItem('auth-key')
      .then((value) => {
        this.setState({ userName: value }, () => {
          Realm.open(databaseOptions)
            .then((realm) => {
              const userInfo = realm.objects(FRIENDS_SCHEMA).filtered(`userName = "${this.state.userName}"`);
              this.setState({ friendsList: userInfo });
            }).catch((error) => {
              Alert.alert('error!');
            });
        });
      });
  }

  componentWillUnmount() {
    // handling unmounted component

    this._isMounted = false;
    // Listener for checking connection state

    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  // function to save the connection state

   handleConnectivityChange = (isConnected) => {
     this.setState({ isConnected });
   }

   // flatlist separator component
  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE',
      }}
    />
  );

  // / get the permission for IOS devices and navigate to Add friends screen
  handlePermissionIOS = () => {
    Contacts.checkPermission((err, permission) => {
      if (err) throw err;

      if (permission === 'undefined') {
        Contacts.requestPermission((err, permission) => {
          if (permission === 'authorized') {
            Contacts.getAll((err, contacts) => {
              if (err) throw err;

              // contacts returned
              this.props.navigation.navigate('Add', contacts);
            });
          }
        });
      }
      if (permission === 'authorized') {
        Contacts.getAll((err, contacts) => {
          if (err) throw err;

          // contacts returned
          this.props.navigation.navigate('Add', contacts);
        });
      }
      if (permission === 'denied') {
        Alert.alert('Permission DENIED');
      }
    });
  }
  // / get the permission for Android devices and navigate to Add friends screen

  handlePermissionANDROID = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Read Contacts',
          message: 'Give us permission to read contacts plz '
          ,
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll((err, contacts) => {
          if (err) throw err;

          // contacts returned
          this.props.navigation.navigate('Add', contacts);
        });
      } else {
        Alert.alert('contacts permission denied');
      }
    } catch (err) {
      Alert.alert(err);
    }
  }

  // / handling Friend Press (row press) and navigate to Info Screen
  handleFriendPress = (item) => {
    this.props.navigation.navigate('Info', item);
  }


  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={[styles.statusBar, { backgroundColor: '#fff' }]}>
          <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
        </View>

        <View style={styles.headerContainer}>

          <TouchableHighlight
            onPress={() => {
              // / device type for its fucntions
              if (Platform.OS === 'android') {
                this.handlePermissionANDROID();
              } else if (Platform.OS === 'ios') {
                this.handlePermissionIOS();
              }
            }}
            style={styles.touchWrapper}
            underlayColor={underlayColor}
          >
            <Icon name={`${deviceIcon}-person-add`} style={styles.icon} size={35} />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              onSignOut();
              this.props.navigation.navigate('Auth');
            }}
            style={styles.touchWrapper}
            underlayColor={underlayColor}
          >
            <Icon name={`${deviceIcon}-log-out`} style={styles.icon} size={35} />
          </TouchableHighlight>
        </View>
        <FlatList
          data={this.state.friendsList}
          renderItem={({ item }) => (
            <ListItems
              item={item}
              onPress={() => this.handleFriendPress(item)}
            />
          )}
          style={{}}
          keyExtractor={item => item.mobile}

          ItemSeparatorComponent={this.renderSeparator}
        />
        {(!this.state.isConnected) ? <OfflineNotice /> : null}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  // / header style
  headerContainer: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',

    borderColor: '#d1d3d6',
    borderBottomWidth: StyleSheet.hairlineWidth,

  },
  icon: {
    color: '#2a66dd',
  },
  touchWrapper: {
    paddingHorizontal: 14, paddingVertical: 4, borderRadius: 5,
  },
  statusBar: {
    height: getStatusBarHeight(),
  },
  // ///// Row style

  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 7,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#525252',
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  email: {
    fontSize: 13,
    color: '#9a9a9a',
  },
});

export default Home;
