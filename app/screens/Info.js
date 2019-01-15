// / Info Screen >> Friends seperate view


import React from 'react';
import {
  View, Text, StatusBar, TouchableHighlight, StyleSheet, Platform, Alert,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';

const underlayColor = '#eff0f2';
const deviceIcon = Platform.OS === 'ios' ? 'ios' : 'md';


const Info = ({ navigation }) => (

  <View style={{ flex: 1 }}>
    <View style={[styles.statusBar, { backgroundColor: '#fff' }]}>
      <StatusBar translucent backgroundColor="#fff" barStyle="dark-content" />
    </View>
    <View style={styles.headerContainer}>
      <TouchableHighlight
        onPress={() => navigation.goBack()}
        style={styles.touchWrapper}
        underlayColor={underlayColor}
      >
        <Icon name={`${deviceIcon}-arrow-round-back`} style={styles.icon} size={35} />
      </TouchableHighlight>

    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.titleStyle}>
        {navigation.state.params.name}

      </Text>
    </View>
    {
      // check if there is a phone number to view it
      (navigation.state.params.mobile !== '') ? (
        <TouchableHighlight onPress={() => Alert.alert('calling...📞')} style={{ width: '100%' }} underlayColor={underlayColor}>
          <View style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >

            <Text style={{ fontWeight: '500', fontSize: 18, paddingRight: 9 }}>
              {navigation.state.params.mobile}

            </Text>

            <Icon name={`${deviceIcon}-call`} style={styles.icon} size={25} />

          </View>
        </TouchableHighlight>
      ) : null }

    {
            // check if there is an email to view it

      (navigation.state.params.email !== '') ? (
        <TouchableHighlight onPress={() => Alert.alert('sending...💌')} style={{ width: '100%' }} underlayColor={underlayColor}>
          <View style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',

          }}
          >

            <Text style={{ fontWeight: '500', fontSize: 18, paddingRight: 9 }}>
              {navigation.state.params.email}

            </Text>

            <Icon name={`${deviceIcon}-mail`} style={styles.icon} size={25} />

          </View>
        </TouchableHighlight>
      ) : null}

  </View>
);
const styles = StyleSheet.create({
// // header Style
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
    paddingHorizontal: 14, paddingVertical: 12, borderRadius: 5,
  },
  statusBar: {
    height: getStatusBarHeight(),
  },
  buttonStyle: {
    fontSize: 18,
    color: '#2a66dd',
  },

  // // Contact Style

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

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 30,
    paddingVertical: 8,
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: '500',
    color: '#2d2e2e',
    textAlign: 'left',
    alignSelf: 'stretch',
  },
});


export default Info;
