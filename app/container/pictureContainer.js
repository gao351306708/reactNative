/**
 * Created by lipeiwei on 16/10/2.
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,Dimensions,ScrollView,RefreshControl,TouchableHighlight,
  View,Alert,Image
} from 'react-native';
import {getAllPicture,getUserAllInfo} from '../util/server'
import Unsplash from 'unsplash-js/native'
import {getAllPhotos} from '../util/unsplash'
import AutoResponsive from 'autoresponsive-react-native'

const { width, height } = Dimensions.get('window');
class PictureContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex:1, //当前查找的页数
      picList:[],
      refreshing:false
    };
  }
  componentDidMount(){
    getAllPhotos(1,20,(data)=>{
      this.setState({
        picList:data
      })
    })
  }
  //下拉加载
  _onRefreshData(){
    let _this = this;
    getAllPhotos(1,20,(data)=>{
      let newData = data;
      setTimeout(()=>{
        _this.setState({
          picList:newData,
          pageIndex:1,
          refreshing: false
        })
      },1000)
    })
  }
  //上拉刷新
  _onEndFresh() {
    let _this = this;
    this.setState({
      refreshing: true
    });
    let currentPageIndex = this.state.pageIndex + 1;
    getAllPhotos(currentPageIndex,20,(data)=>{
      let newData = this.state.picList.concat(data);
      setTimeout(()=>{
        _this.setState({
          picList:newData,
          pageIndex:currentPageIndex,
          refreshing: false
        })
      },1000);
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
            <TouchableHighlight onPress={()=>{this.clickImgHandle(item)}}>
              <Image source={{uri:uri}} style={{width:'100%',height:'100%',resizeMode:'contain'}}></Image>
            </TouchableHighlight>
          </View>
      )
    })
  }
  clickImgHandle (item){
    alert(item.height)
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    backgroundColor: 'gray',
  },
  itemView:{
    padding:5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default PictureContainer;