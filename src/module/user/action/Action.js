import  {ActionType} from '../res/R'
import axios from 'axios'
import {message} from 'antd'

export default {
    regist: (user) =>dispatch =>{
        axios.post('/user/regist',user)
            .then(res => res.data)
            .then(data =>{
                if (data.code === "000000"){
                    message.success(data.msg);
                    dispatch({type:ActionType.USER_REGIST,data:data.data})
                }else {
                    message.error(data.msg)
                }
            })
            .catch(error =>{
                message.error("请求失败，请检查服务器！")
                if (error.response){
                    //message.error("请求失败，请检查服务器！")
                }
            })
    },
    login:(user, onSuccess) =>dispatch =>{
        axios.post('/user/login',user)
            .then(res =>res.data)
            .then(data =>{
                if(data.code ==="000000"){
                    dispatch({type:ActionType.USER_LOGIN,data:data.data})
                    onSuccess(data.data);
                }else {
                    message.error(data.msg)
                }
            })
            .catch(error =>{//这里的catch的只要上边哪段代码出错都会进来抛出异常，并不仅仅是数据交互异常，逻辑或者语法异常都会catch到，考虑后边是否要改写
                message.error("请求失败，请检查网络连接!")
                if (error.response) {
                    console.log(error.response)
                    message.warn("请求失败，请检查网络连接！")
                }
            })
    }
}