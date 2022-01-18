import Vue from "vue";
import Vuex from "vuex";
import router from '../router/index' // eslint-disable-line no-unused-vars
import axios from "axios"
import createPersistedState from "vuex-persistedstate";

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
      // 남아있는 token을 지워준다.
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
    }
  },
  actions: {
    signUp({dispatch}, signUpObj) { 
      //signUpObj = {'username': , 'password': , 'birth': , 'emial': , 'sex': }
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/common/auth/',
        data: signUpObj
      })
      .then(response => {
        let token = response.data.access
        localStorage.setItem('access', token)
        localStorage.setItem('refresh', response.data.refresh)
        dispatch('getMemberInfo')
        router.push({name:"Home"})
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
        // 로그인 성공 시 뒤로가기. 
        router.go(-1)
      })
    },
    logout({ commit }) {
      commit('logout')
      router.push({ name: "Home" })
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
            birth:response.data[0].birth,
            like:response.data[0].like,
            reviews:response.data[0].cosreviewmodel_set
          }
          console.log(response.data)
          commit('loginSuccess', userInfo)
          //router.push({ name: "Home" })
        })
      
    },
    update({commit, state}, updateObj) { // eslint-disable-line no-unused-vars
      //console.log(state.userInfo)
      // 비밀번호가 null일 경우 기존의 비밀번호를 다시 추가해서 request 요청을 보낸다.
        console.log(state.userInfo)
        console.log(state.userInfo.password)
        console.log(updateObj.password)
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/common/useredit/${state.userInfo.id}/`,
        data: updateObj,
        xstfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken',
        headers: {
          'X-CSRFToken': 'csrftoken',
          "Authorization":`Bearer ${localStorage.getItem("access")}`,
        }
      }).then(response => {
        state.userInfo = response.data.results
        commit('loginSuccess', updateObj)
      })

    },
  },
  modules: {

  },
  plugins: [createPersistedState()],
});
