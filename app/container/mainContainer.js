/**
 * 首页
 */
import React ,{Component} from 'react'
import {
    Image,
    StyleSheet,
} from 'react-native';
import {
    TabNavigator,
    StackNavigator,
    createStackNavigator,
    DrawerNavigator,
} from 'react-navigation';
import ReadingScreen from './readingContainer';
import MusicScreen from './musicContainer';
import MovieScreen from './movieContainer';
import PictureScreen from './pictureContainer';
//侧滑菜单的页面
import MineScreen from "./drawer/Mine";
import FriendScreen from "./drawer/Friend";
/**
 * 配置底部标签
 */

const Tab = TabNavigator({
    Read:{
        screen: ReadingScreen,
        navigationOptions: {
            tabBarLabel:'阅读',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../image/reading.png')}
                    style={[{height: 38, width: 40, marginTop: 10}, {tintColor: tintColor}]}/>
            ),

        },
    },
    Music:{
        screen: MusicScreen,
        navigationOptions: {
            //tab 的属性
            tabBarLabel:'音乐',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../image/music.png')}
                    style={[{height: 38, width: 40, marginTop: 10}, {tintColor: tintColor}]}/>
            ),

        },
    },
    Movie:{
        screen: MovieScreen,
        navigationOptions: {
            //tab 的属性
            tabBarLabel:'影视',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../image/movie.png')}
                    style={[{height: 38, width: 40, marginTop: 10}, {tintColor: tintColor}]}/>
            ),

        },
    },
    Picture:{
        screen: PictureScreen,
        navigationOptions: {
            //tab 的属性
            tabBarLabel:'图片',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../image/home.png')}
                    style={[{height: 38, width: 40, marginTop: 8}, {tintColor: tintColor}]}/>
            ),

        },
    }
},{
    //设置TabNavigator的位置
    tabBarPosition: 'bottom',
    //是否在更改标签时显示动画
    animationEnabled: true,
    //是否允许在标签之间进行滑动
    swipeEnabled: true,
    //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    backBehavior: "none",
    //设置Tab标签的属性
    tabBarOptions: {
        //Android属性
        upperCaseLabel: false,//是否使标签大写，默认为true
        //共有属性
        showIcon: true,//是否显示图标，默认关闭
        showLabel: true,//是否显示label，默认开启
        activeTintColor: '#EB3695',//label和icon的前景色 活跃状态下（选中）
        inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
        style: { //TabNavigator 的背景颜色
            backgroundColor: 'white',
            height: 55,
            padding:0,
            margin:0
        },
        labelStyle:{
            marginTop:-3,
            marginRight:5
        },
        indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
            height: 0,
        },
    },
});
/*
 * 配置堆栈导航
 */
const Stack = createStackNavigator({
    Tab: {
        screen: Tab,
    },
    //DrawerNavigator跳转的页面也必须在这里注册
    Mine: {
        screen: MineScreen
    },
    Friends: {
        screen: FriendScreen
    },
},{
    headerMode:'none',//去掉头部
});


/**
 * 配置侧滑菜单
 */
export default Drawer = DrawerNavigator({
    Home: {
        screen: Stack,
        navigationOptions: {
            drawerLabel: '个人中心',
        }
    },
    Mine: {
        screen: MineScreen,
        navigationOptions: {
            drawerLabel: '基本信息',
            drawerIcon: ({tintColor}) => (
                <Image
                    source={require('../image/wallet.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    },
    Friends: {
        screen: FriendScreen,
        navigationOptions: {
            drawerLabel: '朋友',
            drawerIcon: ({tintColor}) => (
                <Image
                    source={require('../image/wallet.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    }

}, {
    drawerWidth: 250, // 展示的宽度
    drawerPosition: 'right', // 抽屉在左边还是右边
});
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    }
});