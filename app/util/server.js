/**
 * Created by gaoju on 2018/9/6.
 */
import fetch from './fetch'
/*
 * 获取所有图片信息
 * */
export const getAllPicture = data => fetch("https://unsplash.com/napi/photos", data);
/*
 * 获取某个人的所有信息
 * */
export const getUserAllInfo = (url,data) => fetch(url, data);
