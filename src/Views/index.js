import Loadable  from 'react-loadable'
// 自己写的loadable , 可实现与上面同样的功能，实现无缝切换
//import Loadable from './myLoadable'

import { Loading } from '../components'
// 路由懒加载
const Dashboard = Loadable({
    loader: () => import('./Dashboard'),
    loading: Loading
})

const ArticleList = Loadable({
    loader: () => import('./Article'),
    loading: Loading
})

const ArticleEdit = Loadable({
    loader: () => import('./Article/edit'),
    loading: Loading
})

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading
})

const Settings = Loadable({
    loader: () => import('./Settings'),
    loading: Loading
})

const Notifications = Loadable({
    loader: () => import('./Notifications'),
    loading: Loading
})

const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading
})

const NotAuth = Loadable({
    loader: () => import('./NotAuth'),
    loading: Loading
})


export {
    Dashboard,
    ArticleList,
    ArticleEdit,
    Login,
    Settings,
    Notifications,
    NotFound,
    NotAuth
}