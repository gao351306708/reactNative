/**
 * 首页
 */
import React ,{Component} from 'react'
import {View,StyleSheet,Animated,Easing,Dimensions,TextInput,ImageBackground,AsyncStorage} from 'react-native';
import { StackActions } from 'react-navigation'
import {Button} from 'react-native-material-ui'


const { width, height } = Dimensions.get('window');
const LoginBackImg = require('../image/loginBackImg.jpg');//加载图片
class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            bounceValue: new Animated.Value(1),
            fadeOut: new Animated.Value(1),
            username:null,
            password:null
        };
    }
    clickHandle(){
        //保存登录信息
        AsyncStorage.setItem('username',JSON.stringify(this.state.username))
        let timing = Animated.timing;
        Animated.parallel(['bounceValue','fadeOut'].map(property=>{
            return timing(this.state[property],{
                toValue: 0,
                duration: 1500,
                easing: Easing.linear
            });
        })).start(()=>{
            this.props.navigation.dispatch(StackActions.replace({
                routeName: 'MainView'
            }));
        });
    }
    render() {
        let {loginStatus,bounceValue,fadeOut} = this.state;
        return (
            <Animated.View
                style={[styles.container,{
                    width: width,
                    height: height,
                    transform: [{ scale: bounceValue }],
                    opacity: fadeOut}]}>
                <ImageBackground source={LoginBackImg} style={{width:'100%',height:'100%',opacity:0.65}}>
                </ImageBackground>
                <View style={{position:'absolute'}}>
                    <View style={styles.formLogin}>
                        <TextInput placeholder="请输入登录名" style={styles.input} onChangeText={value=>this.setState({username:value})}/>
                        <TextInput placeholder="请输入密码" style={styles.input} maxLength={12} onChangeText={value=>this.setState({password:value})} />
                        <Button raised primary text="登录" onPress={this.clickHandle.bind(this)} />
                    </View>
                </View>
            </Animated.View>
        )
    }
};
var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    formLogin:{
        width:180
    },
    input:{
        height:40,
        borderColor: '#ccc',
    },
});
export default LoginPage