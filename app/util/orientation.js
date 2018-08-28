/**
 * Created by gaoju on 2018/8/16.
 */

import {
  Platform,
  NativeModules
} from 'react-native';
import OrientationIOS from 'react-native-orientation';

const {Orientation: OrientationAndroid} = NativeModules;

let Orientation;

if (Platform.OS === 'ios') {
  Orientation = OrientationIOS;
} else {
  Orientation = OrientationAndroid;
}

export default Orientation;