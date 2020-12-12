import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/youxuan',
    component: Layout,
    redirect: '/company/youxuan',
    children: [
      {
        path: 'youxuan',
        component: () => import('@/views/company/youxuan'),
        name: '企业优选',
        meta: { title: '企业优选', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/zhaoshang',
    component: Layout,
    redirect: '/company/zhaoshang',
    children: [
      {
        path: 'zhaoshang',
        component: () => import('@/views/company/zhaoshang'),
        name: '招商雷达',
        meta: { title: '招商雷达', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/pinggu',
    component: Layout,
    redirect: '/company/pinggu',
    children: [
      {
        path: 'pinggu',
        component: () => import('@/views/company/pinggu'),
        name: '入驻评估',
        meta: { title: '入驻评估', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/jianguan',
    component: Layout,
    redirect: '/company/jianguan',
    children: [
      {
        path: 'jianguan',
        component: () => import('@/views/company/jianguan'),
        name: '企业监管',
        meta: { title: '企业监管', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/chain',
    component: Layout,
    redirect: '/company/chain',
    children: [
      {
        path: 'jianguan',
        component: () => import('@/views/company/chain'),
        name: '产业链',
        meta: { title: '产业链', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/ditu',
    component: Layout,
    redirect: '/company/ditu',
    children: [
      {
        path: 'ditu',
        component: () => import('@/views/company/dituye'),
        name: '公司分布',
        meta: { title: '招商雷达', icon: 'guide', noCache: true }
      }
    ]
  },
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
