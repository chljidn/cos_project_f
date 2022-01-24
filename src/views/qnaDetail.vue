<template>
  <div>
    <v-col cols="12" md="6">
      <!-- <v-text-field :label="`title : ${qa_postname}`" solo> -->
      <v-text-field label="qa_postname" v-model="qa_postname" solo>
      </v-text-field>
      <v-textarea solo v-model="qa_content" height="400"></v-textarea>
      <v-layout row wrap justify-end>
        <v-flex shrink>
          <v-btn primary>수정</v-btn>
        </v-flex>
      </v-layout>
    </v-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qa_id: null,
      qa_postname: null,
      qa_content: null,
      qa_user: null,
    };
  },
  mounted() {
    console.log(this.$route);
    console.log(this.$route.params.obj);
    this.qa_postname = this.$route.params.obj[0].postname;
    this.qa_content = this.$route.params.obj[0].content;
    this.qa_user = this.$route.params.obj[0].qa_user;
  },
};
</script>
