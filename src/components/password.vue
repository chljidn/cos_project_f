<template>
  <div>
    <v-text-field
      v-model="passwd"
      label="비밀번호"
      type="password"
      outlined
      dense
    ></v-text-field>
    <v-btn @click="qa_detail_password(passwd)">확인</v-btn>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      url: null,
      passwd: null,
    };
  },
  mounted() {
    this.url = this.$route.params.url;
  },
  methods: {
    qa_detail_password(pd) {
      axios.post(this.url, { password: pd }).then((response) => {
        if (response.status == 200) {
          this.$router.push({
            name: "qnadetail",
            params: { id: response.data[0].id, obj: response.data },
          });
        } else {
          console.log("please password");
        }
      });
    },
  },
};
</script>
