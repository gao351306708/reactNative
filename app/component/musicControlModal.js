/**
 * Created by lipeiwei on 16/10/14.
 */

import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  DeviceEventEmitter,
  Slider,
  Dimensions,
  NativeModules
} from 'react-native';
import {connect} from 'react-redux';
import * as MediaActions from '../actions/media';
import {getNavigator} from '../route';

const ON_MEDIA_COMPLETION = 'ON_MEDIA_COMPLETION';
const MEDIA_PROGRESS_UPDATE = 'MEDIA_PROGRESS_UPDATE';

const {MediaPlayer} = NativeModules;

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  authorName: {
    marginTop: 30
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    height: 60,
  },
  bottomTouchableOpacity: {
    backgroundColor: '#00000088',
    flex: 1
  }
});

class MusicControlModal extends React.Component {

  constructor(props) {
    super(props);
    this.seekTo = this.seekTo.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.goToDetailPage = this.goToDetailPage.bind(this);
    this.state = {
      currentPosition: 0,
      totalDuration: 0
    };
  }
  
  componentDidMount() {
    const {
      turnToNextOne
    } = this.props;
    DeviceEventEmitter.addListener(ON_MEDIA_COMPLETION, () => {
      console.log('播放完成');
      turnToNextOne();//当前先实现顺序循环吧, 单曲循环跟随机播放以后再说
    });
    //进度更新
    DeviceEventEmitter.addListener(MEDIA_PROGRESS_UPDATE, info => {
      this.setState(info);
    });
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners(ON_MEDIA_COMPLETION);
    DeviceEventEmitter.removeAllListeners(MEDIA_PROGRESS_UPDATE);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentMedia !== this.props.currentMedia) {
      this.setState({
        currentPosition: 0,
      });
    }
  }

  //隐藏modal
  closeModal() {
    this.props.changeMusicControlModalVisibility(false);
  }

  render() {
    return <div>123123</div>
  }

  goToDetailPage() {
    const {currentMedia} = this.props;
    if (!currentMedia) {
      return;
    }
    //type 'essay' 'music'
    const {type, id} = currentMedia;
    this.closeModal();
    getNavigator().push({
      name: type === 'essay' ? 'ReadingEssayDetail': 'MusicDetailPage',
      id: parseInt(id)
    });

  }

  seekTo(position) {
    this.setState({currentPosition: position});
    MediaPlayer.seekTo(position);
  }
}

const mapStateToProps = state => {
  let media = state.media;
  let mediaList = media.mediaList;
  if (mediaList.length === 0) {
    return {
      musicName: '',
      authorName: '',
      isPlayingMedia: false,
      isMusicControlModalShow: false,
      isLoadingMedia: false
    };
  }
  let currentMedia = mediaList[media.currentIndex];
  return {
    currentMedia,
    musicName: currentMedia.musicName,
    authorName: currentMedia.authorName,
    isPlayingMedia: media.isPlayingMedia,
    isMusicControlModalShow: media.isMusicControlModalShow,
    isLoadingMedia: media.isLoadingMedia
  };
};

export default connect(mapStateToProps, MediaActions)(MusicControlModal);