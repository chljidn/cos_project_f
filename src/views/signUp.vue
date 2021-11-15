<template>
	<v-container fill-height style="max-width:450px">
		<v-layout align-center row wrap>
			<v-flex xs12>
        <!--
				<v-alert
					class="mb-3"
					dense
					outlined
					:value="isLoginError"
					type="error"
				>
					아이디
				</v-alert>
				<v-alert
					class="mb-3"
					dense
					outlined
					:value="isLogin"
					type="success"
				>
					로그인이 완료되었습니다.
				</v-alert>
        -->
				<v-card>
					<v-toolbar flat>
							<v-toolbar-title>회원가입</v-toolbar-title>
					</v-toolbar>
					<div class="pa-3">
						<v-text-field
              label="id"
              v-model="username"
            ></v-text-field>
            <v-text-field
              label="password"
              v-model="password"
              type="password"
            >
            </v-text-field>
            <v-text-field
              label ="email"
              v-model="email"
            ></v-text-field>
            <v-radio-group
              v-model="sex"
              row
            >
              <v-radio
                value="m"
                label="남"        
              ></v-radio>
              <v-radio
                value="f"
                label="여"        
              ></v-radio>
            </v-radio-group>

            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="birth"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="birth"
                      label="birth"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="birth"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="menu = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(birth)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
						
            <v-btn
							color="grey lighten-1"
							depressed
							block
							large
							@click="signUp({
								username:username,
								password: password,
                email: email,
                sex: sex,
                birth: birth
							})"
						>
							회원가입
						</v-btn>
					</div>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>


<script>
import { mapActions } from 'vuex';  // eslint-disable-line no-unused-vars

export default {
	data () {
		return {
			username: null,
			password: null,
      email: null,
			birth:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
			sex: null,
      menu: false,
      modal: false,
      menu2: false,
      }
	},
	methods: {
		...mapActions(['signUp']),
	}
}
</script>
