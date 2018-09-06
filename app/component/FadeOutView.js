/**
 * 淡出动画
 * Created by gaoju on 2018/9/4.
 */
import React,{Component} from 'react'
import {Animated,Text,View} from 'react-native'

class FadeOutView extends Component{
    constructor(props) {
        super(props);
        this.state={
            fadeAnimate:new Animated.Value(1),//透明度初始值为0
        }
    };
    componentDidMount(){
        Animated.timing(this.state.fadeAnimate,{//根据时间来变化透明度的值
            toValue:0,
            duration:2000
        }).start();
    }
    render(){
        let {fadeAnimate} = this.state;
        return(
            <Animated.View
                style={{width:'100%',height:'100%',opacity:fadeAnimate}}
            >
                {this.props.children}
            </Animated.View>
        )
    }

}
export default FadeOutView