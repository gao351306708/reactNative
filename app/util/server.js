/**
 * Created by gaoju on 2018/9/6.
 */
import fetch from './fetch'
/*
 * 获取某个人的所有信息
 * */
export const getUserAllInfo = (url,data) => fetch(url, data);
