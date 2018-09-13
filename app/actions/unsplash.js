/**
 * 图片模块的API 使用的是 unsplash官方的API
 * Created by gaoju on 2018/9/7.
 * github 地址：https://github.com/unsplash/unsplash-js
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

//Get a single page from the list of all photos
export function getAllPhotos(pageIndex,pageNum,callback) {
    unsplash.photos.listPhotos(pageIndex, pageNum,"latest")
        .then(toJson)
        .then(json => {
            console.log(json);
            callback(json);
        });
}
//Get a list of photos uploaded by a user.
export function getPhotosForUser(username = "",callback) {
    unsplash.users.photos(username, 1, 20, "latest", false)
        .then(toJson)
        .then(json => {
            callback(json);
        });
}
//Get a list of collections created by the user.
export function getCollectionsForUser(username = "",callback) {
    unsplash.users.collections(username, 1, 15, "updated")
        .then(toJson)
        .then(json => {
            callback(json);
        });
}
//Retrieve a single photo's stats.
export function getPhotoStats(id,callback) {
    unsplash.photos.getPhotoStats(id)
        .then(toJson)
        .then(json => {
            callback(json);
        });
}
//Get a list of photos matching the keyword.
export function searchPhotos(name,pageIndex,callback) {
    unsplash.search.photos(name, pageIndex,20)
        .then(toJson)
        .then(json => {
            callback(json);
        });
}
//downloadPhoto
export function downloadPhoto(id,callback) {
    unsplash.photos.getPhoto(id)
        .then(toJson)
        .then(json => {
            unsplash.photos.downloadPhoto(json);
        });
}
//Like a photo on behalf of the logged-in user. This requires the write_likes scope.
export function getLikePhoto(id,callback) {
    unsplash.photos.likePhoto(id)
        .then(toJson)
        .then(json => {
            callback(json);
        });
}
//get photos info
export function getPhotoInfo(id,callback) {
    const url = `https://api.unsplash.com/photos/${id}/info?client_id=${UserConfig.unsplashAlt.accessId}`;
    fetch(url)
        .then((res)=>res.json())
        .then((json)=>{
            callback(json)
        })
}