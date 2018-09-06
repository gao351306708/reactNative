/**
 * Created by gaoju on 2018/8/30.
 */
import React, { Component } from 'react';
import { Image,ImageBackground, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { StackActions,NavigationActions } from 'react-navigation'
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
                    <Text onPress={()=>{
                        this.props.navigation.dispatch(StackActions.replace({routeName: 'MainView'}))
                    }} style={styles.btn} >start>></Text>
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
    btnOut:{
        alignItems:'center',
    },
    btn:{
        width:150,
        height:50,
        color:'#fff',
        marginLeft:btnL,
        marginTop:btnH,
    },
    btnText:{
        fontSize:18,
        color:'#fff'
    },
});