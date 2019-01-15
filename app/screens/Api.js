// / fetching data from third party API Screen

import React, { Component } from 'react';
import {
  View, Text, Alert, StatusBar, StyleSheet, FlatList, NetInfo,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import OfflineNotice from '../components/OfflineBar';

// / Row rendering component

const ListItems = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.name}>
 ID:
        {item.id}
      </Text>
      <Text style={styles.name}>
 Name:
        {item.employee_name}
      </Text>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.name}>
 Salary:
        {item.employee_salary}
$
      </Text>
      <Text style={styles.name}>
 Age:
        {item.employee_age}
      </Text>
    </View>
  </View>
);

class Api extends Component {
  constructor(props) {
    super(props);

    // initial network state
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isConnected });
    });
    this.state = {
      // fetched data
      data: null,
      // / checking connection state
      isConnected: null,
    };
  }


  componentDidMount() {
    // /Listener for connection state
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }


  componentWillUnmount() {
    // // removing it after component unmounted
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  // function to save the connection state
 handleConnectivityChange = (isConnected) => {
   this.setState({ isConnected });
 }

 // / getting API data

 fetchData = () => {
   const url = 'http://dummy.restapiexample.com/api/v1/employees';
   fetch(url, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
     },
   }).then(responseJson => JSON.parse(responseJson._bodyInit)).then((res) => {
     // console.log(res);

     this.setState({ data: res });
   })
     .catch(error => Alert.alert('Error : ', error));
 }

 // function to handle the offline mode and getting the data when it can
  connectionCondtion = () => {
    if (this.state.isConnected && this.state.data === null) {
      this.fetchData();
    } else if (!this.state.isConnected) {
      return (
        <OfflineNotice />
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.statusBar, { backgroundColor: '#fff' }]}>
          <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
        </View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItems
              item={item}
              onPress={() => this.handleFriendPress(item)}
            />
          )}
          style={{}}
          keyExtractor={item => item.id}
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
        {this.connectionCondtion()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
// status bar getting its height from lib
  statusBar: {
    height: getStatusBarHeight(),
  },

  // / Row style
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 7,
    paddingVertical: 30,
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
    marginTop: 8,
  },
  email: {
    fontSize: 13,
    color: '#9a9a9a',
  },

});


export default Api;
