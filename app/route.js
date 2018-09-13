/**
 * 首页
 */
import React ,{Component} from 'react'
import {
    Image,AsyncStorage,
    StyleSheet,View,Text,TouchableHighlight
} from 'react-native';
import {
    TabNavigator,
    StackNavigator,
    createStackNavigator,
    DrawerNavigator,
    DrawerItems,
    SafeAreaView
} from 'react-navigation';
import { Avatar } from 'react-native-material-ui';
import ReadingScreen from './container/readingContainer';
import MusicScreen from './container/musicContainer';
import MovieScreen from './container/movieContainer';
import PictureScreen from './container/pictureContainer';
//侧滑菜单的页面
import MineScreen from "./container/drawer/Mine";
import FriendScreen from "./container/drawer/Friend";
import PictureInfo from "./container/picture/pictureInfo";
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
                    source={require('./image/reading.png')}
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
                    source={require('./image/music.png')}
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
                    source={require('./image/movie.png')}
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
                    source={require('./image/home.png')}
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
        activeTintColor: '#dcdcdc',//label和icon的前景色 活跃状态下（选中）
        inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
        style: { //TabNavigator 的背景颜色
            backgroundColor: '#4a4a4a',
            height: 55,
            padding:0,
            margin:0,
            borderTopWidth:1,
            borderTopStyle:'solid',
            borderTopColor:'#484848'
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
 * 配置页面导航
 */
const Stack = createStackNavigator({
    Tab: {
        screen: Tab,
    },
    //DrawerNavigator跳转的页面也必须在这里注册
    Mine: {screen: MineScreen},
    Friends: {screen: FriendScreen},
    PictureInfo: {screen: PictureInfo},
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
                    source={require('./image/wallet.png')}
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
                    source={require('./image/wallet.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        }
    }

}, {
    drawerWidth: 250, // 展示的宽度
    drawerPosition: 'left', // 抽屉在左边还是右边
    drawerBackgroundColor: '#fff',//抽屉容器的背景颜色 默认为白色
    contentComponent: (props) => {
        return (
            <View>
                <SafeAreaView>
                    <View>
                        <View style={{ paddingVertical:25,justifyContent:'center',alignItems:'center'}}>
                            <Avatar image={<Image source={require('./image/music2-6.jpg')}  style={{width:'100%',height:'100%',borderRadius:40}}/>} size={80} />
                        </View>
                        <DrawerItems {...props}/>
                        <View style={styles.drawerItem}>
                            <TouchableHighlight onPress={ExitHandle}>
                                <Text style={styles.drawerItemText}>退出</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        )
    },
    /**
     * 内容选项
     */
    contentOptions: {
        items: [],
        activeTintColor: '#ff0000',//当前选中 tab 的色调
        activeBackgroundColor: '#fff',// 当前选中 tab 的背景色调
        inactiveTintColor: '#000',//未选中时的 色调
        inactiveBackgroundColor: '#fefefe',//未选中时的 背景颜色
        onItemPress(router) {//按下时触发
            console.log(router)
        },
        itemsContainerStyle: {//容器的样式 View
            //backgroundColor: 'yellow'
        },
        itemStyle: {//单个item容器样式 View
            borderBottomWidth:1,
            borderBottomColor:'gray'
        },
        labelStyle: {//label 字体样式
            color: '#000'
        },
        iconContainerStyle: {//icon 容器样式
            //backgroundColor: 'blue'
        }
    }
});
function ExitHandle(){
    //清除登录信息
    AsyncStorage.removeItem('username');
    //this.props.navigation.navigate('DrawerClose')
}
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    drawerItem:{
        height:48,
        lineHeight:48,
        borderBottomWidth:1,
        borderBottomColor:'gray'
    },
    drawerItemText:{
        height:48,
        lineHeight:48,
        color: '#2196f3',
        fontWeight:'bold',
        textAlign:'center'
    }
});