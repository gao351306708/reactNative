/**
 * 图片详情
 * Created by gaoju on 2018/9/12.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,ScrollView,
    View,Dimensions,Image
} from 'react-native';
import { Avatar,Icon,IconToggle  } from 'react-native-material-ui';
import {getAllPhotos,getPhotoInfo,getPhotosForUser} from '../../actions/unsplash'

const { width, height } = Dimensions.get('window');
class PictureDetail extends Component {
    constructor(props) {
        super(props);
        const navigation = this.props.navigation;//上个页面传过来的参数
        this.state={
            pictureDetail:navigation.state.params.item,//图片信息
            pictureDetailInfo:{},//图片的详细信息
        }
    }
    componentDidMount(){
        let pictureDetail = this.state.pictureDetail;
        let _this = this;
        getPhotoInfo(pictureDetail.id,function(data){
            _this.setState({pictureDetailInfo:data})
        })
    }
    render() {
        let {pictureDetail,pictureDetailInfo} = this.state;
        let W = width;//图片显示的宽
        let H = Math.floor(W*(pictureDetail.height)/(pictureDetail.width));//图片显示的高
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.parts}>
                        <View style={styles.headSection}>
                            <View style={styles.headImgSection}><Avatar image={<Image source={{uri:pictureDetail.user.profile_image.small}} style={styles.headerImg}/>} size={40} /></View>
                            <View style={styles.headNameSection}><Text style={styles.headName}>{pictureDetail.user.name}</Text></View>
                        </View>
                        <View style={styles.favoriteSection}>
                            <View style={styles.favoriteSectionL}>
                                <View style={styles.btn}><Text><Icon name="favorite" color="#f15151" size={12}/> {pictureDetail.likes}</Text></View>
                                <View style={[styles.btn,styles.collection]}><Icon name="add" size={14}/></View>
                            </View>
                            <View style={[styles.btn,styles.download]}><Icon name="file-download" size={14}/></View>
                        </View>
                        <View><Image source={{uri:pictureDetail.urls.regular}} style={{width:W,height:H}} /></View>
                        <View style={styles.footerSection}>
                            <View style={styles.footerSectionL}><Text><Icon name="place" size={14}/> {pictureDetailInfo.location?pictureDetailInfo.location.title:''}</Text></View>
                            <View style={styles.footerSectionR}>
                                <View style={[styles.btn,styles.share]}><Icon name="share" size={14}/></View>
                                <View style={styles.btn}><Icon name="info" size={14}/></View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    parts:{
        width:'100%'
    },
    headSection:{
        flex:1,
        flexDirection:'row',
        padding:10
    },
    headImgSection:{marginLeft:5,marginRight:10},
    headNameSection:{alignContent:'center',justifyContent:'center'},
    headName:{fontSize:16,fontWeight:'bold'},
    headerImg:{
        width:'100%',
        height:'100%',
        borderRadius:20
    },
    favoriteSection:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
    },
    favoriteSectionL:{
        flex:1,
        flexDirection:'row',},
    footerSection:{
        flex:1,
        flexDirection:'row',
        padding:10,justifyContent:'space-between'},
    btn:{
        height:28,
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:5,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10
    },
    collection:{
        marginLeft:10,
    },
    download:{right:0},
    footerSectionL:{
        width:'70%'
    },
    footerSectionR:{
        flex:1,
        flexDirection:'row-reverse',
        width:'30%'
    },
    share:{marginLeft:10}
});
export default PictureDetail;