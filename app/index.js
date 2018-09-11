/**
 * 引导页，也可以作为广告页
 * Created by gaoju on 2018/8/30.
 */
import React, { Component } from 'react';
import { Image,ImageBackground, StyleSheet, Text, Dimensions,TouchableOpacity,AsyncStorage } from 'react-native';
import { StackActions } from 'react-navigation'
//使用Swiper插件 原生的ScrollView 滑动不流畅
import Swiper from 'react-native-swiper'
import FadeInView from './component/fadeInView'

let image1 = require('./image/splash3-3.jpg');
let image2 = require('./image/splash3-4.jpg');
let image3 = require('./image/splash3-2.jpg');

const { width, height } = Dimensions.get('window');
const btnH = height-60;
const btnL = width-90;
export default class GuideView extends Component {
    constructor() {
        super();
    };
    pressClick(){
        let _this = this;
        //获取用户信息
        AsyncStorage.getItem('username').then((value)=>{
            if(value == 'null'|| value == null ||value == ''){
                _this.props.navigation.dispatch(StackActions.replace({routeName: 'LoginView'}))//没有登录信息则跳转到登录页面
            }else {
                _this.props.navigation.dispatch(StackActions.replace({routeName: 'MainView'}));//如果登录了 就直接跳转到主页
            }
        })
    }
    render() {
        return (
            <Swiper
                loop={false}
                showsPagination={false}
            >
                <FadeInView style={styles.backgroundImage}>
                    <Image source={image1}
                           style={styles.backgroundImage} />
                </FadeInView>
                <Image source={image2}
                       style={styles.backgroundImage} />
                <ImageBackground source={image3} style={styles.backgroundImage} >
                    <TouchableOpacity onPress={this.pressClick.bind(this)}>
                        <Text style={styles.btn} >start>></Text>
                    </TouchableOpacity>
                </ImageBackground>
            </Swiper>
        )

    }
};
var styles = StyleSheet.create({
    contentContainer: {
        width: width,
        height: height,
    },
    backgroundImage: {
        width: width,
        height: height,
    },
    btn:{
        width:150,
        height:50,
        color:'#fff',
        marginLeft:btnL,
        marginTop:btnH,
    },
});