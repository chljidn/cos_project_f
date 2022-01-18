<template>
  <div>
    {{this.$store.state.userInfo.like}}
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>
