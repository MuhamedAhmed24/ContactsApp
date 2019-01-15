// / adding friends from contacts screen


import React, { Component } from 'react';
import {
  View, Text, StatusBar, StyleSheet, TouchableHighlight, FlatList, Alert, AsyncStorage,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  FRIENDS_SCHEMA, databaseOptions,
} from '../databases/allSchemas';

const Realm = require('realm');

const underlayColor = '#eff0f2';

// / Row rendering component
const ListItems = ({ item, onPress }) => (
  <TouchableHighlight onPress={onPress} underlayColor="#000">
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {item.givenName}
          {' '}
          {item.familyName}
        </Text>
        <Text style={styles.email}>{(item.phoneNumbers.length > 0) ? item.phoneNumbers[0].number : null}</Text>
      </View>
    </View>
  </TouchableHighlight>
);


class Add extends Component {
  // handling unmount component
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      // / get userName from storage to use it in saving friends
      userName: null,
    };
  }

  componentDidMount() {
    // / getting uuserName
    AsyncStorage.getItem('auth-key')
      .then((value) => {
        this.setState({ userName: value });
      });
  }

  // function to handle each row press ( each press will save the pressed contact to user friend list)
  handleFriendPress = (item) => {
    Realm.open(databaseOptions).then((realm) => {
      realm.write(() => {
        realm.create(FRIENDS_SCHEMA, {
          userName: this.state.userName,
          name: `${item.givenName} ${item.familyName}` || '',
          mobile: (item.phoneNumbers.length > 0) ? item.phoneNumbers[0].number : '',
          email: (item.emailAddresses.length > 0) ? item.emailAddresses[0].email : '',
        });
      });
    }).catch((error) => {
      Alert.alert(error);
    });
  };


  render() {
    // get paramters from navigation
    const contacts = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.statusBar, { backgroundColor: '#fff' }]}>
          <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
        </View>
        <View style={styles.headerContainer}>
          <TouchableHighlight
            onPress={() => this.props.navigation.goBack()}
            style={styles.touchWrapper}
            underlayColor={underlayColor}
          >
            <Text style={styles.buttonStyle}>Done</Text>
          </TouchableHighlight>

        </View>
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <ListItems
              item={item}
              onPress={() => this.handleFriendPress(item)}
            />
          )}

          keyExtractor={item => item.recordID}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#CED0CE',
              }}
            />
          )}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({


  // / Header styles

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

  touchWrapper: {
    paddingHorizontal: 14, paddingVertical: 12, borderRadius: 5,
  },
  statusBar: {
    height: getStatusBarHeight(),
  },
  buttonStyle: {
    fontSize: 18,
    color: '#2a66dd',
  },

  // // Contacts Row Styles

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


export default Add;
