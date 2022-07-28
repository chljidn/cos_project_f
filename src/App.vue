
<template>
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item router :to="{ name: 'Home' }" exact>
              <v-list-item-content>
                <v-list-item-title> Home </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-if="isLogin == false"
              router
              :to="{ name: 'signup' }"
              exact
            >
              <v-list-item-content>
                <v-list-item-title> 회원가입 </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-if="isLogin === false"
              router
              :to="{ name: 'login' }"
              exact
            >
              <v-list-item-content>
                <v-list-item-title> 로그인 </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-if="isLogin === true"
              router
              :to="{ name: 'mypage' }"
              exact
            >
              <v-list-item-content>
                <v-list-item-title> 마이페이지 </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router :to="{ name: 'coslist' }" exact>
              <v-list-item-content>
                <v-list-item-title> 화장품 목록 </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router :to="{ name: 'recommend' }" exact>
              <v-list-item-content>
                <v-list-item-title> 화장품 추천 </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router :to="{ name: 'reviews' }" exact>
              <v-list-item-content>
                <v-list-item-title> 리뷰 </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item router :to="{ name: 'qna' }" exact>
              <v-list-item-content>
                <v-list-item-title> Q&A </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>RECOS</v-toolbar-title>
        <v-spacer></v-spacer>
        <div>
          <v-btn
            color="grey lighten-1"
            dark
            v-bind="attrs"
            v-on="on"
            v-if="isLogin"
            flat
            icon
            @click="clickLogout()"
          >
            logout
          </v-btn>
          <v-btn flat v-else router :to="{ name: 'login' }">login</v-btn>
        </div>
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex"; // eslint-disable-line no-unused-vars
export default {
  name: "app",
  data: () => ({
    drawer: null,
    item: [{ title: "mypage" }, { title: "logout" }],
    closeOnContentClick: true,

    initiallyOpen: ["public"],
    files: {
      // html: "mdi-language-html5",
      // js: "mdi-nodejs",
      // json: "mdi-code-json",
      // md: "mdi-language-markdown",
      // pdf: "mdi-file-pdf",
      // png: "mdi-file-image",
      // txt: "mdi-file-document-outline",
      // xls: "mdi-file-excel",
    },
    tree: [],
    items: [
      {
        name: "public",
        children: [
          {
            name: "static",
          },
          {
            name: "favicon.ico",
          },
          {
            name: "index.html",
          },
        ],
      },
    ],
  }),
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    clickLogout() {
      this.$confirm("정말 로그아웃 하시겠습니까?").then((res) => {
        if (res) {
          this.$store.dispatch("logout");
        }
      });
    },
  },
};
</script>