import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
//路由懒加载
const login = () => import("../views/Login/Login.vue"); //登录页面
const register = () => import("../views/Login/Register.vue"); //注册页面
const layout = () => import("../views/Layout/Index.vue"); //后台主页布局
const home = () => import("../views/home/Home.vue"); //后台首页
const categoryCreate = () => import("../views/Category/Create.vue"); //新建分类
const categoryList = () => import("../views/Category/List.vue"); //分类列表
const articleCreate = () => import("../views/Article/create.vue") //创建文章
const articleList = () => import("../views/Article/list.vue") //创建文章
const adCreate = ()=> import("../views/Ad/create.vue")  //添加广告
const adList = ()=> import("../views/Ad/list.vue")  //广告列表
const linkCreate =()=> import('../views/Links/create.vue')  //添加友情链接
const linkList =()=> import('../views/Links/list.vue')   //友情链接列表
const commentAudited = ()=> import("../views/Comment/audited.vue") //已审核评论
const commentUnreviewed = ()=> import('../views/Comment/unreviewed.vue') //未审核评论
const routes = [{
    path: "/",
    name: "layout",
    component: layout,
    redirect: "/index/home",
    children: [{
        path: "/index/home",
        name: "home",
        component: home,
        meta: {
          title: "首页"
        }
      },
      {
        path: "/category/create",
        name: "categoryCreate",
        component: categoryCreate,
        meta: {
          title: "新增分类"
        }
      },
      {
        path: "/category/list",
        name: "categoryList",
        component: categoryList,
        meta: {
          title: "分类列表"
        }
      },
      {
        path: '/article/create',
        name: 'articleCreate',
        component: articleCreate,
        meta: {
          title: "新增文章"
        }
      },
      {
        path:'/articles/edit/:id',
        name:'/articles/edit',
        component:articleCreate,
        meta:{
          title:"编辑文章"
        },
        props: true
      },
      {
        path: '/article/list',
        name: 'article_list',
        component: articleList,
        meta: {
          title: "文章列表"
        }
      },
      {
        path:"/ad/create",
        name:"adCreate",
        component:adCreate,
        meta:{
          title:"添加广告位"
        }
      },
      {
        path:"/ad/list",
        name:"adList",
        component:adList,
        meta:{
          title:"广告位列表"
        }
      },
      {
        path:"/link/create",
        name:"linkCreate",
        component:linkCreate,
        meta:{
          title:"添加友情链接"
        }
      },
      {
        path:"/link/list",
        name:"linkList",
        component:linkList,
        meta:{
          title:"友情链接列表"
        }
      },
      {
        path:"/commnet/audited",
        name:"commentAudited",
        component:commentAudited,
        meta:{
          title:"已审核"
        }
      },
      {
        path:"/comment/unreviewed",
        name:"commentUnreviewed",
        component:commentUnreviewed,
        meta:{
          title:"未审核"
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      isPublic: true
    }
  },
  {
    path: "/register",
    name: "register",
    component: register,
    meta: {
      isPublic: true
    }
  },
  {
    path: "/404",
    component: () => import("../components/404.vue"),
    meta: {
      title: "404"
    }
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    next("/login");
  }
  next();
});
export default router;