<template>
  <div>
    {{qa_detail_obj}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      qa_detail_obj : null
    }
  }, 
  mounted () {
    this.qa_detail_obj = this.$route.params.data
  }
}
</script>
