import axios from 'axios'
import { message } from 'antd'
const isDev = process.env.NODE_ENV === 'development'
const service = axios.create({
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/234835' : ''
})

service.interceptors.request.use((config)=>{

    config.data = Object.assign({},config.data,{
        autoToken: window.localStorage.getItem('token') ||''
    })
    return config
})

service.interceptors.response.use((resp) =>{
    if(resp.status===200){
        return resp.data
    }else{
        //全局错误处理
        message.error('请求数据失败')
    }
})

export const getArticles = (offset=0,limited=10)=>{
    return service.post('api/v1/articleList',{
        offset,
        limited
    })
}

// 删除文章
export const deleteArticle = (id)=>{
    return service.post(`api/v1/deleteArticle/${id}`)
}

// 编辑文章
export const editArticle = (id)=>{
    return service.post(`api/v1/editArticle/${id}`)
}

//保存文章
export const saveArticle = (id,data)=>{
    return service.post(`api/v1/saveArticle/${id}`,data)
}