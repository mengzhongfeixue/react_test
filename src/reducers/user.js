import actionTypes from "../actions/actionTypes"

const isLogin = Boolean(window.localStorage.getItem('respUserInfo')) || Boolean(window.sessionStorage.getItem('respUserInfo'))
const respUserInfo = Object.assign({},JSON.parse(window.localStorage.getItem('respUserInfo')),JSON.parse(window.sessionStorage.getItem('respUserInfo')))
const initState = {
    isLogin,
    ...respUserInfo,
    isLoading:false,
}

export default (state=initState, action) =>{
    switch(action.type){
        case actionTypes.START_LOGIN:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload.userInfo,
                isLogin:true,
                isLoading: false
            }
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                isLogin: false
            }
        default:
            return state
    }
}