import actionTypes from './actionTypes'
import {loginRequest} from '../requests'

const startLogin = ()=>{
    return {
        type: actionTypes.START_LOGIN
    }
}

const loginSuccess = (userInfo)=>{
    
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload:{
            userInfo
        }
    }
}

const loginFailed = ()=>{
    window.localStorage.removeItem('respUserInfo')
    window.sessionStorage.removeItem('respUserInfo')
    return {
        type: actionTypes.LOGIN_FAILED
    }
}

//实际项目中websocket推送

export const login = (userInfo)=>{
    return dispatch =>{
        dispatch(startLogin())
        loginRequest(userInfo)
          .then(res =>{
              //console.log(res)
              if(res.code===200){
                  if(userInfo.remember === true){
                    window.localStorage.setItem("respUserInfo",JSON.stringify(res.data))
                      
                  }else{
                    window.sessionStorage.setItem("respUserInfo",JSON.stringify(res.data))
                  }
                  dispatch(loginSuccess(res.data))
              }else{
                  dispatch(loginFailed())
              }
          })
    }
}

export const logout = ()=>dispatch=>{
    //实际项目中，在这里要告诉服务器用户退出
    dispatch(loginFailed())
}



