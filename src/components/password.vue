<template>
  <div
    style="
      height: 300px;
      width: 300px;
      text-align: center;
      margin-left: 40%;
      margin-top: 15%;
    "
  >
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
      console.log(pd);
      axios
        .post(this.url, { password: pd })
        .then((response) => {
          this.$store.commit("qa_data_mounted", response.data);
          this.$router.push({
            name: "qnadetail",
            params: {
              // id: response.data.id,
              // obj: response.data,
              detail: true,
            },
          });
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>
