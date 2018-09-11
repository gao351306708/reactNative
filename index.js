import { AppRegistry, YellowBox} from 'react-native';
//跳转到启动页
import App from './App';
//直接跳转到首页
//import App from './app/route';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
console.disableYellowBox = true ;// 关闭全部黄色警告

AppRegistry.registerComponent('reactNative',() => App);
