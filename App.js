/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    FlatList,
    Button,
    Alert,TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback
} from 'react-native';


var MOCKED_MOVIES_DATA = [
  {
    title: "标题",
    year: "2015",
    posters: { thumbnail: "http://i.imgur.com/UePbdph.jpg" }
  }
];
var REQUEST_URL = "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      movies:null,
      data:[],
      load:false
    }
  }
  componentDidMount(){
    this.fetchData()
  }
  fetchData=()=>{
    fetch(REQUEST_URL)
        .then((res)=>res.json())
        .then((resData)=>{
          console.log("fetch==>",resData)
          this.setState({
            data:this.state.data.concat(resData.movies),
            load:true
          })
        })
  }
  renderMovie({item}){
    return(
        <View style={styles.container}>
          <Image source={{uri:item.posters.thumbnail}} style={styles.thumbnail}></Image>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.year}>{item.year}</Text>
            <TouchableNativeFeedback onPress={() => {Alert.alert("你点击了按钮！")}}>
              <View style={styles.alterButton}>
                <Text>点我</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
    )
  }
  render() {
    let {data,load} = this.state;
    if(!load){
      return (
          <View style={styles.container}>
            <Text>正在加载电影数据。。。</Text>
          </View>
      )
    }
    return(
        <FlatList data={data} renderItem={this.renderMovie} style={styles.list} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#F5FCFF",
    borderBottomWidth:1,
    borderBottomColor:'gray'
  },
  thumbnail:{
    width:53,
    height:81
  },
  rightContainer:{
    flex:1,
    backgroundColor:'white',
    height:81
  },
  title:{
    fontSize:16,
    marginBottom:8,
    textAlign:'center'
  },
  year:{
    textAlign:'center'
  },
  list:{
    paddingTop:20,
    backgroundColor:'#F5FCFF'
  },
  alterButton:{
    width:80,
    alignItems:'center',
    backgroundColor:'#2196F3'
  }
});