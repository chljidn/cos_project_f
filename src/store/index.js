import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index"; // eslint-disable-line no-unused-vars
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import VueCookies from "vue-cookies";// eslint-disable-line no-unused-vars

Vue.use(Vuex).use(VueCookies);
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export default new Vuex.Store({
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false,
    reviewModalWindow: false,
  },
  mutations: {
    // 로그인이 성공했을 때
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.isLoginError = false;
      state.userInfo = payload;
    },
    //로그인이 실패했을 때
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },
    logout(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.userInfo = null;
      // 남아있는 token을 지워준다.
      Vue.$cookies.remove("access");
      Vue.$cookies.remove("refresh");
    },
    checkReviewModal(state) {
      state.reviewModalWindow = !state.reviewModalWindow;
    }

  },
  actions: {
    signUp({ dispatch }, signUpObj) { // eslint-disable-line no-unused-vars
      //signUpObj = {'username': , 'password': , 'birth': , 'emial': , 'sex': }
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/common/signup/",
        data: signUpObj,
      }).then((response) => {
        let token = response.data.access;
        localStorage.setItem("access", token);
        localStorage.setItem("refresh", response.data.refresh);
        dispatch("getMemberInfo");
        alert("회원가입이 완료되었습니다.");
        router.push({ name: "Home" });
      }).catch((error) => {
        alert(error.response.data.message);
      });
    },
    // 로그인 시도
    // login.vue에서 입력한 아이디와 패스워드이가 loginObj로 전달이 된다.
    login({ dispatch }, loginObj) {
      // eslint-disable-line no-unused-vars
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/common/login/",
        data: {
          username: loginObj.username,
          password: loginObj.password,
        },
        xstfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFToken",
        headers: {
          "X-CSRFToken": "csrftoken",
        },
      }).then((response) => {
        //axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        Vue.$cookies.set("access", response.data["access"]);
        Vue.$cookies.set("refresh", response.data["refresh"]);
        dispatch("getMemberInfo");
        // 로그인 성공 시 뒤로가기.
        router.go(-1);
      });
    },
    logout({ commit }) {
      commit("logout");
      router.push({ name: "Home" });
    },
    getMemberInfo({ commit }) {
      let token = Vue.$cookies.get("access");
      let config = {
        // eslint-disable-line no-unused-vars
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get(`http://127.0.0.1:8000/common/myinfo/${localStorage.getItem("id")}/`, config)
        .then((response) => {
          let userInfo = {
            // eslint-disable-line no-unused-vars
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            sex: response.data.sex,
            birth: response.data.birth,
            like: response.data.like,
            reviews: response.data.cosreviewmodel_set,
            recommends: response.data.recommends_excel_set
          };
          commit("loginSuccess", userInfo);
        }).catch((error) => { // eslint-disable-line no-unused-vars
          console.log(error);
        });
    },
    update({ commit, state }, updateObj) {
      // eslint-disable-line no-unused-vars
      //console.log(state.userInfo)
      // 비밀번호가 null일 경우 기존의 비밀번호를 다시 추가해서 request 요청을 보낸다.
      console.log(state.userInfo);
      console.log("password: ", updateObj.password);
      if (updateObj["password"] == '') {
        Vue.delete(updateObj, "password")
      }
      console.log(updateObj)
      axios({
        method: "patch",
        url: `http://127.0.0.1:8000/common/myinfo/${localStorage.getItem("id")}/`,
        data: updateObj,
        xstfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFToken",
        headers: {
          "X-CSRFToken": "csrftoken",
          Authorization: `Bearer ${Vue.$cookies.get("access")}`,
        },
      }).then((response) => {
        alert("회원정보 수정이 정상적으로 완료되었습니다.");
        console.log(response.data)
        let userInfo = {
          // eslint-disable-line no-unused-vars
          id: response.data[0].id,
          username: response.data[0].username,
          email: response.data[0].email,
          sex: response.data[0].sex,
          birth: response.data[0].birth,
          like: response.data[0].like,
          reviews: response.data[0].cosreviewmodel_set,
        };
        commit("loginSuccess", userInfo);
      });
    },
    // eslint-disable-next-line no-unused-vars
    qa_detail({ commit }, qa_id) {
      axios
        .get(`http://127.0.0.1:8000/common/qa/${qa_id}/`)
        .then((response) => {
          console.log(response.data);
          router.push({
            name: "qnadetail",
            // qna 디테일 페이지(수정)와 생성 페이지를 같은 vue로 사용하기 위함. 생성으로 들어갈 때에는 파라미터에 create만 존재하고 detail은 존재하지 않는다. 그 역은 반대이다.
            params: {
              id: response.data.id,
              obj: response.data,
              detail: true,
            },
          });
        })
        .catch((error) => {
          // eslint-disable-line no-unused-vars
          // 패스워드가 필요한 qna인 경우 check_password 컴포넌트에서 패스워드를 체크할 수 있도록 한다.
          // 각 url에 따라서 패스워드를 체크할 때 공통적인 컴포넌트로 사용하기 위해서 url을 받는다.
          console.log(error);
          router.push({
            name: "check_password",
            params: {
              url: `http://127.0.0.1:8000/common/qa/${qa_id}/`,
            },
          });
        });
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
