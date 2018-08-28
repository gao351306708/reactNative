/**
 * Created by gaoju on 2018/8/16.
 */

import React from 'react';
import {
    StyleSheet
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import PictureContainer from './pictureContainer';
import ReadingContainer from './readingContainer';
import MusicContainer from './musicContainer';
import MovieContainer from './movieContainer';
import TabBar from '../component/tabBar';

const styles = StyleSheet.create({
    subView: {
        overflow: 'hidden'
    }
});

//tabbar图片资源
const TAB_BAR_RESOURCES = [
    [require('../image/home.png'), require('../image/home_active.png')],
    [require('../image/reading.png'), require('../image/reading_active.png')],
    [require('../image/music.png'), require('../image/music_active.png')],
    [require('../image/movie.png'), require('../image/movie_active.png')]
];

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ScrollableTabView
                tabBarPosition="bottom"
                locked={true}
                scrollWithoutAnimation={true}
                prerenderingSiblingsNumber={4}
                renderTabBar={() => {
                  return <TabBar tabBarResources={TAB_BAR_RESOURCES}/>
                }}
            >
                <PictureContainer style={styles.subView}/>
                <ReadingContainer style={styles.subView}/>
                <MusicContainer style={styles.subView}/>
                <MovieContainer style={styles.subView}/>
            </ScrollableTabView>
        );
    }
}

export default MainContainer;