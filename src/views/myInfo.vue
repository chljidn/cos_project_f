<template>
  <div class="my-info-background-class">
    <div class="my-info-content-class">
      <!-- label은 input의 초기값. 단, data와 바인딩 되어 있지는 않음. 
					v-model은 data()의 각 변수들과 바인딩되어 있다는 것으로 텍스트의 값이 바뀌면 그 값이 그대로 data()의 변수에 들어가게 됨.-->
      <p>id : {{ username }}</p>
      <v-text-field label="패스워드" v-model="password" type="password">
      </v-text-field>
      <v-text-field label="email" v-model="email"></v-text-field>
      <v-radio-group v-model="sex" row>
        <v-radio value="M" label="남"></v-radio>
        <v-radio value="F" label="여"></v-radio>
      </v-radio-group>
      <v-text-field label="birth" v-model="birth"></v-text-field>
      <!-- <v-btn
        :max-width="1"
        style="float: right"
        color="grey lighten-1"
        depressed
        large
        @click="
          update({
            password: password,
            email: email,
            birth: birth,
            sex: sex,
          })
        "
        >수정</v-btn
      > -->
      <botton
        style="float: right; cursor: pointer"
        @click="
          update({
            password: password,
            email: email,
            birth: birth,
            sex: sex,
          })
        "
      >
        수정
      </botton>
    </div>
  </div>
</template>
<style>
.my-info-background-class {
  width: 100%;
  height: 100%;
  /* text-align: center; */
  /* border: solid 1px; */
}
.my-info-content-class {
  /* display: inline-block; */
  /* border: solid 1px; */
  width: 700px;
  max-width: 60%;
  margin-left: 10px;
  margin-top: 20px;
}
</style>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      username: this.$store.state.userInfo.username,
      password: null,
      email: this.$store.state.userInfo.email,
      birth: this.$store.state.userInfo.birth,
      sex: this.$store.state.userInfo.sex,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapActions(["update"]),
  },
};
</script>
