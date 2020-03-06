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
const category_create = () => import("../views/Category/Create.vue"); //新建分类
const category_list = () => import("../views/Category/List.vue"); //分类列表
const article_create = () => import("../views/Article/create.vue") //创建文章
const article_list = () => import("../views/Article/list.vue") //创建文章
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
        name: "category-create",
        component: category_create,
        meta: {
          title: "新增分类"
        }
      },
      {
        path: "/category/list",
        name: "category_list",
        component: category_list,
        meta: {
          title: "分类列表"
        }
      },
      {
        path: '/article/create',
        name: 'article_create',
        component: article_create,
        meta: {
          title: "新增文章"
        }
      },
      {
        path:'/articles/edit/:id',
        name:'/articles/edit',
        component:article_create,
        meta:{
          title:"编辑文章"
        },
        props: true
      },
      {
        path: '/article/list',
        name: 'article_list',
        component: article_list,
        meta: {
          title: "文章列表"
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