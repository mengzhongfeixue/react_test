import { Dashboard,Login,NotFound,Settings,ArticleEdit,ArticleList } from '../Views'

export const mainRoutes = [{
    pathname: '/login',
    component: Login
},{
    pathname: '/404',
    component: NotFound
}]

export const adminRoutes = [{
    pathname: '/admin/dashboard',
    component: Dashboard,
    title:'仪表盘',
    icon:'dashboard',
    isNav: true
},{
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章管理',
    icon:'unordered-list',
    isNav: true,
    exact: true
},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: '文章编辑',
},{
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    icon:'setting',
    isNav: true
}]