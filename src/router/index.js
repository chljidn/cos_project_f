import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const rejectAuthUser = (to, from, next) => {
  // eslint-disable-line no-unused-vars
  if (store.state.isLogin === true) {
    alert("이미 로그인 되었습니다.");
    next("/");
  } else {
    next();
  }
};

const onlyAuthUser = (to, from, next) => {
  // eslint-disable-line no-unused-vars
  if (store.state.isLogin === false) {
    alert("로그인이 필요한 기능입니다.");
    next("/");
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/signUp.vue"),
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: rejectAuthUser,
    component: () => import("../views/login.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    beforeEnter: onlyAuthUser,
    component: () => import("../views/myPage.vue"),
    // mypagebasic의 자식 컴포넌트들
    children: [
      {
        path: "/mypage/myinfo",
        name: "myinfo",
        component: () => import("../views/myInfo.vue"),
      },
      {
        path: "/mypage/myreviews",
        name: "myreviews",
        component: () => import("../components/myPageComponents/myReviews.vue"),
      },
      {
        path: "/mypage/mylikes",
        name: "mylikes",
        component: () => import("../components/myPageComponents/myLikes.vue"),
      },
      {
        path: "/mypage/myrecommends",
        name: "myrecommends",
        component: () => import("../components/myPageComponents/myRecommends.vue"),
      }
    ],
  },
  {
    path: "/coslist",
    name: "coslist",
    component: () => import("../views/cosList.vue"),
  },
  {
    path: "/coslist/:id",
    name: "cosdetail",
    component: () => import("../views/cosDetail.vue"),
  },
  {
    path: "/qna",
    name: "qna",
    component: () => import("../views/qna.vue"),
  },
  {
    path: "/qna/:id",
    name: "qnadetail",
    component: () => import("../views/qnaDetail.vue"),
  },
  {
    path: "/recommend",
    name: "recommend",
    component: () => import("../views/cosRecommend.vue"),
  },
  {
    path: "/recommend/result",
    name: "recommendresult",
    component: () => import("../views/recommendResult.vue"),
  },
  {
    path: "/reviews",
    name: "reviews",
    component: () => import("../views/reviews.vue"),
  },
  {
    path: "/check_password",
    name: "check_password",
    component: () => import("../components/password.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,

});


export default router;
