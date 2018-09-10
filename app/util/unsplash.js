/**
 * 图片模块的API 使用的是 unsplash官方的API
 * Created by gaoju on 2018/9/7.
 */
import Unsplash, { toJson } from 'unsplash-js/native';
const UserConfig = {
    unsplashAlt: {
        accessId: '3d682d92c4bc616112c87d1e8adf26fc8eaeb880eb91166a2ba8560326ca71d2',
        secretKey: 'b5851913c9f5768ed5d9ed8bd3370b2e168d693d9af2d1c3324c424a09421719',
        callbackUrl: 'urn:ietf:wg:oauth:2.0:oob',
    },
    keys: {
        bookmarks: 'allBookmarkedItems'
    }
}
const unsplash = new Unsplash({
    applicationId: UserConfig.unsplashAlt.accessId,
    secret: UserConfig.unsplashAlt.secretKey,
    callbackUrl: UserConfig.unsplashAlt.callbackUrl,
})

export function getAllPhotos(pageIndex,pageNum,callback) {
    unsplash.photos.listPhotos(pageIndex, pageNum)
        .then(toJson)
        .then(json => {
            console.log(json);
            callback(json);
        });
}

export function getPhotosForUser(callback, username = "vorosbenisop") {
    unsplash.users.photos(username, 1, 20, "popular", false)
        .then(toJson)
        .then(json => {
            callback(json);
        });
}