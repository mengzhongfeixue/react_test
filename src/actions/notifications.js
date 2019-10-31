import actionTypes from './actionTypes'
import {getNotifications} from '../requests'

const startMarkAsReaded = ()=>{
    return {
        type: actionTypes.START_NOTIFICATION_REQUEST
    }
}

const finishMarkAsReaded = ()=>{
    return {
        type: actionTypes.FINISH_NOTIFICATION_RESPONSE
    }
}

export const markNotificationHasReaded = (id) =>dispatch=>{
    dispatch(startMarkAsReaded())
    // 模拟服务端请求
    setTimeout(()=>{
        dispatch({
            type: actionTypes.MARK_NOTIFICATION_READED,
            payload:{
                id
            }
        })
        dispatch(finishMarkAsReaded())
    },2000)
}

export const markAllNotificationsReaded = ()=>dispatch=>{
    dispatch(startMarkAsReaded())
    // 模拟服务端请求
    setTimeout(()=>{
        dispatch({
            type: actionTypes.MARK_ALL_NOTIFICATIONS_READED
        })
    dispatch(finishMarkAsReaded())
    },2000)
}

export const getNotificationsList = ()=>dispatch=>{
    dispatch(startMarkAsReaded())
    getNotifications()
      .then(resp=>{
        dispatch({
            type:actionTypes.RECEIVED_NOTIFICATIONS,
            payload:{
                list: resp.data.list
            }
        })
      })
      .finally(()=>{
        dispatch(finishMarkAsReaded())
      })
    
    
}

