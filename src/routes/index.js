import { Dashboard,Login,NotFound,Settings,ArticleEdit,ArticleList } from '../Views'

export const mainRouter = [{
    pathname: '/login',
    component: Login
},{
    pathname: '/404',
    component: NotFound
}]

export const adminRouter = [{
    pathname: '/admin/dashboard',
    component: Dashboard
},{
    pathname: '/admin/article',
    component: ArticleList,
    exact: true
},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit
},{
    pathname: '/admin/settings',
    component: Settings
}]