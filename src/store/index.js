import Vue from "vue";
import Vuex from "vuex";
import router from '../router/index' // eslint-disable-line no-unused-vars
import axios from "axios"

Vue.use(Vuex);

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

export default new Vuex.Store({
  state: {
    userInfo: null,
    isLogin: false,
    isLoginError: false,
  },
  mutations: {
    // 로그인이 성공했을 때
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
    },
    //로그인이 실패했을 때
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    },
    logout(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
    }
  },
  actions: {
    signUp({commit}, signUpObj) { // eslint-disable-line no-unused-vars
      console.log(signUpObj)
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/common/auth/',
        data: signUpObj
      })
      .then(response => {
        console.log(response.data)
      })

    },
    // 로그인 시도
    // login.vue에서 입력한 아이디와 패스워드이가 loginObj로 전달이 된다.
    login({dispatch}, loginObj) {  // eslint-disable-line no-unused-vars
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/common/auth/',
        data: {
          'username': loginObj.username,
          'password': loginObj.password
        },
        xstfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {
          'X-CSRFToken': 'csrftoken',
        }
      })
      .then(response => {
        //axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        let token = response.data.access
        localStorage.setItem('access', token)
        localStorage.setItem('refresh', response.data.refresh)
        dispatch('getMemberInfo')
      })
    },
    logout({ commit }) {
      commit('logout')
      router.push({ name: "home" })
    },
    getMemberInfo({commit}) {
      let token = localStorage.getItem("access")
      let config = { // eslint-disable-line no-unused-vars
        headers : {
          "Authorization":`Bearer ${token}`,
        }
      }
      axios.get('http://127.0.0.1:8000/common/mypage/', config)
      //axios.get('http://127.0.0.1:8000/common/my_page/')
        .then(response => {
          console.log(response.data[0])
          let userInfo = { // eslint-disable-line no-unused-vars
            id: response.data[0].id,
            username:response.data[0].username,
            email: response.data[0].email,
            sex:response.data[0].sex,
            birth:response.data[0].birth
          }
          console.log(response.data)
          commit('loginSuccess', userInfo)
        })
      
    },
    update({commit, state}, updateObj) { // eslint-disable-line no-unused-vars
      //console.log(state.userInfo)
      console.log(updateObj)
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/common/useredit/${state.userInfo.id}/`,
        data: updateObj,
        xstfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {
          'X-CSRFToken': 'csrftoken',
        }
      },
      commit('loginSuccess', updateObj))
    }
  },
  modules: {},
});
