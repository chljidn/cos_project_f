<template>
  <v-container fill-height style="max-width: 450px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-alert class="mb-3" dense outlined :value="isLoginError" type="error">
          아이디와 비밀번호를 확인해주세요.
        </v-alert>
        <!-- <v-alert
					class="mb-3"
					dense
					outlined
					:value="isLogin"
					type="success"

				>
					로그인이 완료되었습니다.
				</v-alert> -->
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>로그인</v-toolbar-title>
          </v-toolbar>
          <div class="pa-3">
            <v-text-field
              v-model="username"
              label="아이디를 입력하세요"
            ></v-text-field>
            <!-- <v-text-field
              v-model="password"
              type="password"
              label="패스워드를 입력하세요"
              v-on:keyup.enter="
                login({
                  username: username,
                  password: password,
                })
              "
            ></v-text-field> -->
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="패스워드를 입력하세요"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-btn
              color="grey lighten-1"
              depressed
              block
              large
              @click="
                login({
                  username: username,
                  password: password,
                })
              "
            >
              로그인
            </v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex"; // eslint-disable-line no-unused-vars

export default {
  data() {
    return {
      username: null,
      // password: null,
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: null,
      rules: {
        // required: (value) => !!value || "Required.",
        // min: (v) => v.length >= 8 || "Min 8 characters",
        // emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  computed: {
    ...mapState(["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(["login"]),
  },
};
</script>
