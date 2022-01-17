<template>
  <div style="height:100%; padding:20px;">
    <div style="padding: 20px; width:17%; height:100%; float:left; border-right: 1px solid black; text-align: center;">
      <p @click="$router.push({
      name: 'myinfo'})"> my page </p>
      <p @click="$router.push({
        name: 'myreviews'})"> my reviews </p>
      <p> my likes </p>  
    </div>
    <div style="width:70%; float:right; box-sizing: border-box; background:white;">
      <router-view></router-view>
    </div> 
  </div>
</template>



<script>
export default {
  mounted() {
  }
}
</script>
