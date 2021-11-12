import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index"

Vue.use(VueRouter);

const rejectAuthUser = (to, from, next) => { // eslint-disable-line no-unused-vars
  if(store.state.isLogin === true) {
    alert('이미 로그인 되었습니다.')
    next("/")
  } else {
    next()
  }
}

const onlyAuthUser = (to, from, next) => { // eslint-disable-line no-unused-vars
  if(store.state.isLogin === false) {
    alert('로그인이 필요한 기능입니다.')
    next("/")
  } else {
    next()
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => 
      import("../views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    beforeEnter : rejectAuthUser, 
    component: () =>
      import("../views/login.vue")
  },
  {
    path: "/mypage",
    name: "mypage",
    beforeEnter: onlyAuthUser,
    component: () =>
      import("../views/myPage.vue")
  }
  ,
  {
    path: "/coslist",
    name: "coslist",
    component: () =>
      import("../views/cosList.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
