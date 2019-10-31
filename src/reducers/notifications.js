import actionTypes from '../actions/actionTypes'
const initState = {
    isLoading: false,
    list: [{
        id:1,
        title: '通知1',
        desc: '通知1详文，此处省去300字',
        hasRead: false
    },{
        id:2,
        title: '通知2',
        desc: '通知2详文，此处省去300字',
        hasRead: true
    }]
}

export default (state=initState,action) =>{
    switch(action.type){
        case actionTypes.START_NOTIFICATION_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FINISH_NOTIFICATION_RESPONSE:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.RECEIVED_NOTIFICATIONS:
            return {
                ...state,
                list:action.payload.list
            }
        case actionTypes.MARK_NOTIFICATION_READED:
            const newList = state.list.map(item=>{
                if(item.id===action.payload.id){
                    item.hasRead = true
                }
                return item
            })
            return {
                ...state,
                list:newList
            }
        case actionTypes.MARK_ALL_NOTIFICATIONS_READED:
            return {
                ...state,
                list:state.list.map(item=>{
                    item.hasRead= true
                    return item
                })
            }            
        default:
            return state
    }
}