/**
 * Created by lipeiwei on 16/10/2.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  TouchableOpacity,TouchableWithoutFeedback,Linking
} from 'react-native';

class MovieContainer extends Component {

  constructor(props) {
    super(props);
  }
    open=()=>{
        let url = 'https://v.qq.com';
        Linking.openURL(url)
    }
  render() {
    return (
          <View style={styles.container}>
              <TouchableWithoutFeedback onPress={this.open}>
                  <View><Text>点击</Text></View>
              </TouchableWithoutFeedback>
          </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
export default MovieContainer;
