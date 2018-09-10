/**
 * fetch请求数据
 * Created by gaoju on 2018/9/6.
 */
import {bodyUrlencoded} from './dateUtil'
export default async(url = '',data='', type='GET') =>{
    type = type.toUpperCase();
    let newUrl = '';
    if (data!= '') {
        newUrl = url + '?' +bodyUrlencoded(data);//数据拼接字符串
    }
    let requestData = {
        method: type,
        mode: "cors",//跨域
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }
    if (type !== 'GET') {
        requestData.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    }
    try {
        const response = await fetch(newUrl, requestData);
        const responseJson = await response.json();
        return responseJson
    } catch (error) {
        throw new Error(error)
    }
}