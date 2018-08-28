/**
 * Created by gaoju on 2018/8/16.
 */

import {
    NativeModules
} from 'react-native';
import {ACTIONS} from '../reducers/config'

var MediaPlayer;

MediaPlayer = NativeModules.MediaPlayer;

export function stopPlayMedia() {
    return dispatch => {
        MediaPlayer.stop().then(() => {
            dispatch({
                type: ACTIONS.STOP_PLAY_MEDIA
            });
        });
    }
}