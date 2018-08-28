import { AppRegistry, YellowBox} from 'react-native';
import App from './App';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
console.disableYellowBox = true ;// 关闭全部黄色警告

AppRegistry.registerComponent('reactNative',()=>App);
