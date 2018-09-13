/**
 * Created by lipeiwei on 16/10/2.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,Dimensions,ScrollView,RefreshControl,TouchableOpacity,
  View,Image,TextInput,ImageBackground
} from 'react-native';
import { Icon  } from 'react-native-material-ui';
import {getUserAllInfo} from '../util/server'
import {getAllPhotos,searchPhotos} from '../actions/unsplash'
import AutoResponsive from 'autoresponsive-react-native'

const { width, height } = Dimensions.get('window');
const LoginBackImg = require('../image/loginBackImg.jpg');//加载图片
class PictureContainer extends Component {
  //static navigationOptions = {
  //  title: 'Welcome',
  //};
  constructor(props) {
    super(props);
    this.state = {
      pageIndex:1, //当前查找的页数
      picList:[],
      refreshing:false,
      photoKey:''
    };
  }
  componentDidMount(){
    getAllPhotos(1,20,(data)=>{
      this.setState({
        picList:data
      })
    })
  }
  //判断滚动是否到达底部
  handleScroll(e) {
    let contentSize = e.nativeEvent.contentSize.height;//整个渲染出来的view高度
    let scrollY = e.nativeEvent.contentOffset.y;//滑动的距离
    let height = e.nativeEvent.layoutMeasurement.height;//滚动窗口的高度
    if ((scrollY + height) >= contentSize){
      this._onEndFresh();
    }
  }
  searchHandle(){
    this.setState({
      refreshing: true,
      pageIndex:1,
      picList:[]
    });
    this.getSearchPhotos(1)
  }
  //根据输入值查询图片
  getSearchPhotos(currentPageIndex){
    let _this = this;
    let newData = [];
    let name = this.state.photoKey;
    searchPhotos(name,currentPageIndex,function(data){
      if(currentPageIndex == 1){//如果是第一页则不需要拼接
        newData = data.results
      }else{
        newData = (_this.state.picList).concat(data.results);
      }
      setTimeout(()=>{
        _this.setState({
          picList:newData,
          pageIndex:currentPageIndex,
          refreshing: false
        })
      },1000)
    })
  }
  //查询图片
  getAllPhotos(currentPageIndex){
    let _this = this;
    let newData=[];
    getAllPhotos(currentPageIndex,20,(data)=>{
      if(currentPageIndex == 1){//如果是第一页则不需要拼接
        newData = data
      }else{
        newData= _this.state.picList.concat(data);
      }
      setTimeout(()=>{
        _this.setState({
          picList:newData,
          pageIndex:currentPageIndex,
          refreshing: false
        })
      },1000);
    })
  }
  //下拉加载
  _onRefreshData(){
    //如果查询输入框有值则发送查找请求
    if(this.state.photoKey){
      this.getSearchPhotos(1)
    }else {
      this.getAllPhotos(1)
    }
  }
  //上拉刷新
  _onEndFresh() {
    this.setState({
      refreshing: true
    });
    let currentPageIndex = this.state.pageIndex + 1;
    //如果查询输入框有值则发送查找请求
    if(this.state.photoKey){
      this.getSearchPhotos(currentPageIndex)
    }else {
      this.getAllPhotos(currentPageIndex)
    }
  }
  render() {
    let {picList} = this.state;
    return (
        <View style={styles.container}>
          <ScrollView onMomentumScrollEnd={(e)=>this.handleScroll(e)}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefreshData.bind(this)}
                          progressBackgroundColor="#ffffff" />
                      }
                      showsVerticalScrollIndicator={false}
                      bounces={true}
          >
            <View style={styles.headerSection}>
              <ImageBackground source={LoginBackImg} style={{width:'100%',height:'100%',opacity:0.65}}>
              </ImageBackground>
              <View style={styles.headerText}>
                <View style={{marginBottom:10}}><Text style={{color:'white',fontSize:26}}>Unsplash</Text></View>
                <View style={{marginBottom:5}}>
                  <Text style={{color:'white',fontSize:14}}>Beautiful,free photos.</Text>
                  <Text style={{color:'white',fontSize:14}}>Gifted by the world's most generous community of photographers.</Text></View>
                  <View style={styles.searchInputSection}>
                    <TextInput
                      placeholder="Search photos"
                      style={styles.searchInput}
                      underlineColorAndroid='transparent'
                      onChangeText={value=>this.setState({photoKey:value})} />
                    <TouchableOpacity style={styles.searchIcon} onPress={()=>{this.searchHandle()}} >
                      <Icon  name="search" size={32}/></TouchableOpacity>
                  </View>
                <View style={{marginTop:5}}><Text style={{color:'white',fontSize:14}}>Example:business,computer,love,house,girl..</Text></View>
              </View>
            </View>
            <AutoResponsive ref="container" itemMargin={8}>
              {this.getView(picList)}
            </AutoResponsive>
          </ScrollView>
        </View>
    );
  }
  getView(list){
    return list.map((item,index)=>{
      let uri = item.urls.small;
      let W = Math.floor((width/2)-10);//图片显示的宽
      let H = Math.floor(W*(item.height)/(item.width));//图片显示的高
      return (
          <View style={{width:W,height:H,marginLeft:5,padding:8,backgroundColor:'white'}}>
            <TouchableOpacity onPress={()=>{this.clickImgHandle(item)}}>
              <Image source={{uri:uri}} style={{width:'100%',height:'100%',resizeMode:'contain'}}></Image>
            </TouchableOpacity>
          </View>
      )
    })
  }
  clickImgHandle (item){
    const { navigate } = this.props.navigation;
    return navigate('PictureInfo',{item:item})
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    backgroundColor: 'gray',
  },
  headerSection:{
    flex:1,
    position:'relative',
    minHeight:200,
    marginBottom:10
  },
  headerText:{
    position:'absolute',
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20,
    paddingBottom:30,
  },
  itemView:{
    padding:5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputSection:{
    flex:1,
    flexDirection:'row'
  },
  searchInput:{
    width:'90%',
    height:48,
    backgroundColor:'white',
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5
  },
  searchIcon:{
    width:'10%',
    height:48,
    backgroundColor:'white',
    color:'#999',
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
    paddingTop:10
  }
});
export default PictureContainer;