import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VuetifyConfirm from "vuetify-confirm";
Vue.use(VuetifyConfirm, {
  buttonTrueText: "예",
  buttonFalseText: "아니오",
  color: "grey",
  icon: "warning",
  title: "Warning",
  width: 350,
  property: "$confirm",
})


Vue.config.productionTip = false;

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.dispatch("getMemberInfo");
  },
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
