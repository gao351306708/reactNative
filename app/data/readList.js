/**
 * 阅读部分的数据列表
 * Created by gaoju on 2018/9/5.
 */
import Mock from 'mockjs'
//var readList=null;
let data = Mock.mock({
    'list|3':[{
        'id|+1':0,
        'name':'秋分@id',
        'imgUrl|1-6':1,
        'content|1-3':'秋风吹动枯枝败草，仿佛有什么在追着他跑。',
        'www|1-5':[{'name':'张三'}],
    }]
})
export const readList = JSON.stringify(data,null,4)


let data2 = Mock.mock({
    'list|6':[{
        'id|+1':0,
        'count|10-50':1,
        'imgUrl|+1':7,
        'content|1-2':'那些文艺的法国电影',
    }]
})
export const musicList1 = JSON.stringify(data2,null,4)