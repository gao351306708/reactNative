/**
 * Created by gaoju on 2018/8/16.
 */


import {
  ToastAndroid
} from 'react-native'

function show(message) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}

function showLong(message) {
  ToastAndroid.show(message, ToastAndroid.LONG);
}

export default {
  show,
  showLong
}