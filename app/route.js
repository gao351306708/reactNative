/**
 * Created by gaoju on 2018/8/16.
 */

import MainContainer from './container/mainContainer';
import ImageViewer from './component/imageViewer';

import {
    Navigator,
} from 'react-native-deprecated-custom-components';

let navigator;

//路由
const routeMap = new Map();

routeMap.set('MainContainer', {
    component: MainContainer
});
routeMap.set('ImageViewer', {
    component: ImageViewer,
    sceneAnimation: Navigator.SceneConfigs.FadeAndroid
});


export function registerNavigator(tempNavigator) {
    if (navigator) {
        return;
    }
    navigator = tempNavigator;

}

export function getNavigator() {
    return navigator;
}

export function getRouteMap() {
    return routeMap;
}