/**
 * Created by lipeiwei on 16/10/2.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,ScrollView,FlatList,Modal,TouchableHighlight,
  Dimensions,Image,ImageBackground
} from 'react-native';
import baseStyle from "../style/commonStyle"
import Swiper from 'react-native-swiper'
import {Icon} from 'react-native-material-ui'
import {readList} from '../data/readList'

const { width, height } = Dimensions.get('window');
const MainBackGroundColor = baseStyle.BACKGROUND_COLOR;
const image1 = require('../image/read1-1.jpg');
const image2 = require('../image/read1-2.jpg');
const image3 = require('../image/read1-3.jpg');

class ReadingContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
          favoriteFlag:false,
          modalVisible:false
      };
  }
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <Text style={styles.headerText}>READING   IS   ALL</Text>
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
                <View style={styles.sectionPart}>
                    <View style={{height:30}}>
                        <Text style={{color:'#dcdcdc'}}>分类导航</Text>
                    </View>
                    <View style={styles.sectionPart2}>
                        <View style={styles.items}>
                            <ImageBackground source={require('../image/read2-5.jpg')} style={styles.backgroundImage}>
                                <Text style={styles.sectionPart2Text}>问答</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.items}>
                            <ImageBackground source={require('../image/read2-4.jpg')} style={styles.backgroundImage}>
                                <Text style={styles.sectionPart2Text}>漫画</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.items}>
                            <ImageBackground source={require('../image/read2-2.jpg')} style={styles.backgroundImage}>
                                <Text style={styles.sectionPart2Text}>阅读</Text>
                            </ImageBackground></View>
                        <View style={styles.items}>
                            <ImageBackground source={require('../image/read2-3.jpg')} style={styles.backgroundImage}>
                                <Text style={styles.sectionPart2Text}>连载</Text>
                            </ImageBackground>
                        </View>
                    </View>
                </View>
                <View>
                    <FlatList data={JSON.parse(readList).list}
                              renderItem={this.getView}
                    />
                </View>

            </ScrollView>
        </View>
    );
  }
    favoriteClick=()=>{
        alert("11111111111111")
        //let idname = "favorite";
        //this.setState({favoriteFlag:!this.state.favoriteFlag})
        //alert(this.state.favoriteFlag)
    }
    getView({item}){
        return (
            <View style={styles.sectionPart} key={item.id}>
                <View style={{height:30,lineHeight:30}}><Text style={styles.articleHeader}>{item.name}</Text></View>
                <View style={{height:30,lineHeight:30}}><Text style={styles.articleAuthor}>文 / 我是西红柿</Text></View>
                <Image source={item.imgUrl} style={styles.articleImg} />
                <Text style={styles.articleContent}>{item.content}</Text>
                <View style={styles.articleFooter}>
                    <View><Text style={styles.articleFooterL}>今天</Text></View>
                    <View style={styles.articleFooterR}>
                        <Text style={styles.articleFooterRT}><Icon style={{color:'#aeaeae'}} name="share"></Icon></Text>
                        <Text onPress={()=>{alert(item.id)}}><Icon style={{color:'#f4a1a1'}} ref={"favorite"+item.id} name="favorite"></Icon></Text>
                    </View>
                </View>
            </View>
        )
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
    sectionPart:{
        flex:1,
        width:width,
        minHeight:200,
        marginTop: 10,
        padding:10,
        backgroundColor:'#4a4a4a'
    },
    sectionPart2:{
        flex:1,
        height:160,
        flexWrap:'wrap',
        alignContent:'stretch',
    },
    items:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
        margin:5,
        borderWidth:1,
        borderStyle:'solid'
    },
    backgroundImage:{
        width:'100%',
        height:"100%"
    },
    sectionPart2Text:{
        fontSize:16,
        color:'white',
        textAlign:"center",
        marginTop:40
    }
});
export default ReadingContainer;