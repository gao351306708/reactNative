/**
 * 音乐主页面
 * Created by gaoju 2018/09/05.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,ScrollView,FlatList,
    Dimensions,Image,ImageBackground
} from 'react-native';
import baseStyle from "../style/commonStyle"
import Swiper from 'react-native-swiper'
import {Icon} from 'react-native-material-ui'
import {musicList1} from '../data/readList'

const { width, height } = Dimensions.get('window');
const MainBackGroundColor = baseStyle.BACKGROUND_COLOR;
const widthDD = (width/3)-15;
const widthHY = width-20;
const image1 = require('../image/music1-1.jpg');
const image2 = require('../image/music1-2.jpg');
const image3 = require('../image/music1-3.jpg');
const image2_1 = require('../image/music2-1.jpg');
const image2_2 = require('../image/music2-2.jpg');
const image2_3 = require('../image/music2-3.jpg');
const image2_4 = require('../image/music2-4.jpg');
const image2_5 = require('../image/music2-5.jpg');
const image2_6 = require('../image/music2-6.jpg');
class MusicContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <Text style={styles.headerText}>MUSIC</Text>
            </View>
            <ScrollView style={styles.container}>
                <Swiper loop={true} height={170} paginationStyle={{bottom: 5}} autoplay={true} autoplayTimeout={4} >
                    <Image source={image1}
                           style={styles.bannerImg} />
                    <Image source={image2}
                           style={styles.bannerImg} />
                    <Image source={image3}
                           style={styles.bannerImg} />
                </Swiper>
                <View style={styles.MsectionPart}>
                    <View style={styles.MsectionPart2}>
                        <View style={styles.MsectionPart2Items}>
                            <View style={styles.MsectionPart2ItemsIcon}><Icon style={{color:'white'}} name="album" /></View>
                            <Text style={styles.MsectionPart2ItemsName}>热门推荐</Text>
                        </View>
                        <View style={styles.MsectionPart2Items}>
                            <View style={styles.MsectionPart2ItemsIcon}><Icon style={{color:'white'}} name="queue-music" /></View>
                            <Text style={styles.MsectionPart2ItemsName}>音乐</Text>
                        </View>
                        <View style={styles.MsectionPart2Items}>
                            <View style={styles.MsectionPart2ItemsIcon}><Icon style={{color:'white'}} name="assessment" /></View>
                            <Text style={styles.MsectionPart2ItemsName}>排行榜</Text>
                        </View>
                        <View style={styles.MsectionPart2Items}>
                            <View style={styles.MsectionPart2ItemsIcon}><Icon style={{color:'white'}} name="radio" /></View>
                            <Text style={styles.MsectionPart2ItemsName}>电台</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.MsectionPart}>
                    <View style={styles.MsectionPartHeader}>
                        <Text style={styles.MsectionPartHeaderText}>推荐歌单 > </Text>
                    </View>
                    <View style={styles.MsectionPart3}>
                        {this.getItem2View(JSON.parse(musicList1).list)}
                    </View>
                </View>
                <View style={styles.MsectionPart}>
                    <View style={styles.MsectionPartHeader}>
                        <Text style={styles.MsectionPartHeaderText}>最新音乐 > </Text>
                    </View>
                    <View style={styles.MsectionPart3}>
                        <FlatList data={JSON.parse(musicList1).list}
                                  renderItem={this.getItemView}
                                  horizontal={true}
                        />
                    </View>
                </View>
                <View style={styles.MsectionPart}>
                    <View style={styles.MsectionPartHeader}>
                        <Text style={styles.MsectionPartHeaderText}>会员专区 </Text>
                    </View>
                    <View style={styles.MsectionPartHYImg}>
                        <Swiper loop={true} height={170} width={width} showsPagination={false}>
                            <Image source={image1}
                                   style={styles.huiyuanImg} />
                            <Image source={image2}
                                   style={styles.huiyuanImg} />
                            <Image source={image3}
                                   style={styles.huiyuanImg} />
                        </Swiper>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
  }
    getItemView({item}){
        return(
            <View style={styles.MsectionPart3Items}>
                <View>
                    <Image source={item.imgUrl} style={styles.MsectionPart3ItemsImg}>
                    </Image>
                </View>
                <View><Text style={styles.MsectionPart3ItemsContent}>{item.content}</Text></View>
            </View>
        )
    }
    getItem2View(list){
        return list.map((item,index)=>{
            return(
                <View style={styles.MsectionPart3Items} key={index}>
                    <View>
                        <ImageBackground source={item.imgUrl} style={styles.MsectionPart3ItemsImg}>
                            <Text style={styles.MsectionPart3ItemsImgText} ><Icon style={styles.MsectionPart3ItemsImgIcon} name="headset" />{item.count+'万'}</Text>
                        </ImageBackground>
                    </View>
                    <View><Text style={styles.MsectionPart3ItemsContent}>{item.content}</Text></View>
                </View>
            )
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MainBackGroundColor,
        color:'#dcdcdc',
    },
    sectionHeader:{
        //flex:1,
        width:width,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#4a4a4a',
    },
    headerText:{
        fontSize:18,
        color:'#dcdcdc',
    },
    bannerImg:{
        flex:1,
        width:width,
    },
    MsectionPartHYImg:{
        width:width
    },
    huiyuanImg:{
        flex:1,
        textAlign:'center',
        width:widthHY,
        marginLeft:2,
        marginRight:2
    },
    articleImg:{
        width:"100%",
        height:200
    },
    articleHeader:{fontSize:18,color:'#dcdcdc'},
    articleAuthor:{fontSize:14,color:'#aeaeae',},
    articleContent:{fontSize:14,color:'#aeaeae',marginTop:10,marginBottom:20},
    articleFooter:{
        flex:1,
        flexDirection:'row',
        justifyContent:"space-between",
        //flexWrap:'wrap',
    },
    articleFooterL:{fontSize:14,color:'#aeaeae'},
    articleFooterR:{
        flex:1,
        flexDirection:'row-reverse',
    },
    articleFooterRT:{marginLeft:15},
    MsectionPart:{
        flex:1,
        width:width,
        //minHeight:100,
        marginTop: 10,
        padding:10,
        backgroundColor:'#4a4a4a'
    },
    MsectionPartHeader:{
        height:42,
        lineHeight:42
    },
    MsectionPartHeaderText:{
        color:'#dcdcdc',
        fontSize:18
    },
    MsectionPart2:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:10
    },
    MsectionPart2Items:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        //width:60,
        margin:5,
    },
    MsectionPart2ItemsIcon:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:23,
        backgroundColor:'#b8b8a5',
        height: 46,
        width:46,
    },
    ItemsIconColor:{
        color:'#aeaeae'
    },
    MsectionPart2ItemsName:{
        marginTop:10,
        color:'#aeaeae'
    },
    backgroundImage:{
        width:'100%',
        height:"100%"
    },
    MsectionPart2Text:{
        fontSize:16,
        color:'white',
        textAlign:"center",
        marginTop:40
    },
    MsectionPart3:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
    },
    MsectionPart3Items:{
        width:widthDD,
        marginLeft:2,
        marginRight:2
    },
    MsectionPart3ItemsImg:{
        width:'100%',
        height:100
    },
    MsectionPart3ItemsImgText:{
        color:'#dcdcdc',
        textAlign:'right',
        marginTop:5,
        marginRight:5
    },
    MsectionPart3ItemsImgIcon:{
        fontSize:12,
        color:'#dcdcdc',
    },
    MsectionPart3ItemsContent:{
        fontSize:12,
        color:'#dcdcdc',
        marginTop:5,
        marginBottom:5
        //marginTop:10,
        //marginBottom:10
    }
});


export default MusicContainer;