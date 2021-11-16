<template>
	<v-container fill-height style="max-width:450px">
		<v-layout align-center row wrap>
			<v-flex xs12>
				<v-card>
					<v-toolbar flat>
							<v-toolbar-title class="flex text-center">회원가입</v-toolbar-title>
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

            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="birth"
                  label="Birthday date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="birth"
                :active-picker.sync="activePicker"
                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
				
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
			sex: null,
      // date picker - birth
      activePicker: null,
      birth: null,
      menu: false,
      }
	},
  watch: {
    // date picker
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
	methods: {
		...mapActions(['signUp']),

    // date picker
    save (birth) {
      this.$refs.menu.save(birth)
    },
	}
}
</script>
