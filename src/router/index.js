import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Login from "@/components/Login";
import Welcome from "@/components/Welcome";

Vue.use(Router);

var router = new Router({
  routes: [
    { path: "/home", component: Home,redirect:'/welcome',children:[{
      path:'/welcome',component:Welcome
    }] },
    { path: "/login", component: Login }
  ]
});

//给路由设置‘导航守卫’
//在守卫中对token进行监听，有token就让执行，否则就跳转到登陆页去
router.beforeEach((to, from, next) => {
  //请求login就直接通过
  if (to.path === "/login") {
    return next(); //直接通过
  }
  //请求非login，就判断token
  var token = window.sessionStorage.getItem("token");
  if (!token) {
    return next("/login"); //跳转登陆界面
  }
  next();
});
export default router;
