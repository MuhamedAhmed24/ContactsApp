
// component of the offlineBar the redbar on the footer

import React from 'react';
import {
  View, Text, Dimensions, StyleSheet,
} from 'react-native';
// get the width of currenct device
const { width } = Dimensions.get('window');
const MiniOfflineSign = () => (
  <View style={styles.offlineContainer}>
    <Text style={styles.offlineText}>No Internet Connection</Text>
  </View>
);
const OfflineNotice = () => (
  <MiniOfflineSign />
);

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'relative',

  },
  offlineText: {
    color: '#fff',
  },
});
export default OfflineNotice;
