/**
 * Created by gaoju on 2018/8/30.
 */
import React, { Component } from 'react';
import { Image,ImageBackground, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { StackActions,NavigationActions } from 'react-navigation'
//使用Swiper插件 原生的ScrollView 滑动不流畅
import Swiper from 'react-native-swiper'

let image1 = require('./image/tangsan.jpg');
let image2 = require('./image/splash.jpg');

const { width, height } = Dimensions.get('window');
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
                <Image source={image1}
                       style={styles.backgroundImage} />
                <ImageBackground source={image2} style={[styles.backgroundImage,styles.btnOut]} >
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                                        this.props.navigation.dispatch(StackActions.replace({
                                            routeName: 'MainView'
                                        }));
                                    }}>
                        <Text style={styles.btnText}>启动应用</Text>
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
    btnOut:{
        alignItems:'center',
    },
    btn:{
        width:150,
        height:50,
        backgroundColor:'#90ee90',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        marginTop:400,

    },
    btnText:{
        fontSize:18,
        color:'#fff'
    },
});