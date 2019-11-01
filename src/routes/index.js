import { Dashboard,Login,NotFound,Settings,ArticleEdit,ArticleList,Notifications,NotAuth } from '../Views'

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
    isNav: true,
    roles:['001','002','003']
},{
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章管理',
    icon:'unordered-list',
    isNav: true,
    exact: true,
    roles:['001','002']
},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: '文章编辑',
    roles:['001','002']
},{
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    icon:'setting',
    isNav: true,
    roles:['001']
},{
    pathname: '/admin/notifications',
    component: Notifications,
    title: '通知',
    icon:'message',
    isNav: true,
    roles:['001','002']
},{
    pathname: '/admin/notauth',
    component: NotAuth,
    roles:['001','002','003']
}]