/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    BackAndroid,
    Platform
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import {getRouteMap, registerNavigator} from './route';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navigator: {
        flex: 1,
        backgroundColor: 'white'
    },
    errorView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    errorText: {
        color: 'red',
        fontSize: 16
    }

});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
    }
    componentWillMount() {
    }

    componentDidMount (){
    }
    //出场动画
    configureScene(route) {
        let sceneAnimation = getRouteMap().get(route.name).sceneAnimation;
        if (sceneAnimation) {
            return sceneAnimation;
        }
        //默认
        return Navigator.SceneConfigs.PushFromRight
    }

    renderScene(route, navigator) {
        this.navigator = navigator;
        registerNavigator(navigator);
        //Each component name should start with an uppercase letter
        //jsx中的组件都得是大写字母开头, 否则将报错, expected a component class, got [object Object]
        let Component = getRouteMap().get(route.name).component;
        if (!Component) {
            return (
                <View style={styles.errorView}>
                    <Text style={styles.errorText}>您所启动的Component未在routeMap中注册</Text>
                </View>
            );
        }
        return (
            <Component {...route}/>
        );
    }
    render() {
        return(
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="black"
                    barStyle="default"
                />
                <Navigator
                    style={styles.navigator}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    initialRoute={{
                        name: 'MainContainer'//MainContainer
                      }}/>
            </View>
        )
    }
}

export default function globalInit() {
    var loggerMiddleware = createLogger();
    var store = applyMiddleware(thunk, loggerMiddleware)(createStore)(reducers);
    return () => {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    };
};