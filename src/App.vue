<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item router :to="{name:'Home'}" exact>
            <v-list-item-content>
              <v-list-item-title>
                Home
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="isLogin === false" router :to="{name:'login'}" exact>
            <v-list-item-content>
              <v-list-item-title>
                로그인
              </v-list-item-title>
            </v-list-item-content>  
          </v-list-item>

          <v-list-item v-if="isLogin === true" router :to="{name:'mypage'}" exact>
              <v-list-item-content>
                <v-list-item-title>
                  마이페이지
                </v-list-item-title>
            </v-list-item-content>  
          </v-list-item>
          
          <v-list-item router :to="{name:'coslist'}" exact>
              <v-list-item-content>
                <v-list-item-title>
                  화장품 목록
                </v-list-item-title>
            </v-list-item-content>  
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>RECOS</v-toolbar-title>
      
        <v-spacer></v-spacer>
        <v-menu
          top
          :close-on-content-click="closeOnContentClick"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color = "grey lighten-1"
              dark
              v-bind="attrs"
              v-on="on"
              v-if="isLogin"
              flat
              icon
            >
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-btn>
            <v-btn flat v-else router :to="{name: 'login'}">login</v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="clickFunction(item.title)"
            >
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import {mapState} from 'vuex' // eslint-disable-line no-unused-vars

export default {
    data: () => ({ 
      drawer: null,
      items: [
        { title: 'mypage'},
        { title: 'logout'},
      ],
      closeOnContentClick: true
    }),
    computed: {
      ...mapState(['isLogin'])
    },
    methods: {
      clickFunction(title) {
        if (title === 'mypage')
          this.$router.push({name: "mypage"})
        else 
          this.$store.dispatch("logout")
        
      }
    }
  }
</script>
