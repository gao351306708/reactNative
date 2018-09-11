/*
 * APP启动首页
 * */
import React, { Component } from 'react';
import { View, Text, StyleSheet,Animated,Dimensions } from 'react-native';
import {StackNavigator,createStackNavigator,StackActions} from 'react-navigation'
import GuidePage from './app/index'
import LoginPage from './app/container/loginContainer'
import MainView from './app/route'

const splashImg = require('./app/image/splash3-1.jpg');//加载图片

const { width, height } = Dimensions.get('window');

class SplashView extends Component {
    constructor(props) {
        super(props);
        this.state = {  //这是动画效果
            bounceValue: new Animated.Value(1),
            guideFlag:false
        };
    }
    componentDidMount() {
        Animated.timing(
            this.state.bounceValue, { toValue: 1.2, duration: 2500 }
        ).start();
        this.timer = setTimeout(() => {
            this.props.navigation.dispatch(StackActions.replace({
                routeName: 'GuideView'
            }));
        }, 3000);

    }
    componentWillUpdate = () => {
        clearTimeout(this.timer);
    }
    render() {
        return (
            <Animated.Image
                style={{
                    width: width,
                    height: height,
                    transform: [{ scale: this.state.bounceValue }]
                }}
                source={splashImg}
            />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});
//定义跳转页面screen
const RootStack = createStackNavigator({
    SplashView: SplashView,
    GuideView:GuidePage,
    LoginView:LoginPage,
    MainView:MainView
},{
    initialRouteName: 'SplashView',//默认第一个显示
    mode:'modal',
    headerMode:'none',//去掉头部
});
export default RootStack