<template>
	<div class=pa-3>
			<v-col
					cols="12"
					sm="6"
					md="3"
				>
				<!-- label은 input의 초기값. 단, data와 바인딩 되어 있지는 않음. 
				    v-model은 data()의 각 변수들과 바인딩되어 있다는 것으로 텍스트의 값이 바뀌면 그 값이 그대로 data()의 변수에 들어가게 됨.--> 
					<v-text-field
						label="id"
						v-model="username"
					></v-text-field>
					<v-text-field
						label="패스워드"
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
					<v-text-field 
						label ="birth"
						v-model="birth"
					></v-text-field>
					</v-col>
					<v-btn
						color="grey lighten-1"
						depressed
						block
						large
						@click="update({
							username:username,
							password: password,
							email:email,
							birth:birth,
							sex:sex,  
						})"
					>수정</v-btn>

	</div>
	
</template>

<script>
import {mapState, mapActions} from "vuex"
export default {
	data () {
			return {
					username: this.$store.state.userInfo.username,
					password: null,
					email: this.$store.state.userInfo.email,
					birth: this.$store.state.userInfo.birth,
					sex: this.$store.state.userInfo.sex,
			}
	},
	computed: {
			...mapState(["userInfo"]),
	},
	methods: {
			...mapActions(["update"]) 
	}
}
</script>