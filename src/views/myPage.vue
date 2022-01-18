<template>
  <div style="height:100%; padding:20px;">
    <div style="padding: 20px; width:17%; height:100%; float:left; border-right: 1px solid black; text-align: center;">
      <a
        style="color:black;"
        @click="$router.push({
      name: 'myinfo'})"> my page 
      </a><br>
      <a
        style="color:black;"
        @click="$router.push({
        name: 'myreviews'})"> my reviews 
      </a><br>
      <a
      style="color:black;"
       @click="$router.push({
        name: 'mylikes'})"> my likes 
      </a>  
    </div>
    <div style="width:70%; float:right; box-sizing: border-box; background:white;">
      <router-view></router-view>
    </div> 
  </div>
</template>



<script>
import {mapState, mapActions} from "vuex"
export default {

  computed: {
			...mapState(["userInfo"]),
	},
	methods: {
			...mapActions(["update"]),
       
	},
  mounted() {
    console.log(this.$store.state.userInfo)
  }
}
</script>
