<template>
  <div class="my-page-background-class">
    <div class="my-page-menu-class">
      <a
        style="color: black"
        @click="
          $router.push({
            name: 'myinfo',
          })
        "
      >
        my page </a
      ><br />
      <a
        style="color: black"
        @click="
          $router.push({
            name: 'myreviews',
          })
        "
      >
        my reviews </a
      ><br />
      <a
        style="color: black"
        @click="
          $router.push({
            name: 'mylikes',
          })
        "
      >
        my likes </a
      ><br />
      <a
        style="color: black"
        @click="
          $router.push({
            name: 'myrecommends',
          })
        "
      >
        my recommends
      </a>
    </div>
    <div class="my-page-content-class">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.my-page-background-class {
  border: solid 1px;
  width: 100%;
  height: 100%;
  padding: 20px;
}
.my-page-menu-class {
  width: 20%;
  height: 100%;
  border-right: 1px solid;
  float: left;
  text-align: center;
}
.my-page-content-class {
  /* border: solid 1px; */
  float: right;
  height: 100%;
  width: 75%;
  margin-left: 10px;
}
</style>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapActions(["update"]),
  },
  mounted() {
    console.log(this.$store.state.userInfo);
  },
};
</script>
