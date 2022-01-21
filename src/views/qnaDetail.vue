<template>
  <div>
    {{ qa_obj }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      qa_id: null,
      qa_obj: null,
    };
  },
  mounted() {
    console.log(this.$route);
    console.log(this.$route.params.obj);
    this.qa_obj = this.$route.params.obj;
  },
};
</script>
