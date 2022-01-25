<template>
  <div>
    <!-- qna를 읽거나 수정하는 경우 -->
    <div v-if="this.$route.params.detail">
      <v-col cols="12" md="6">
        <!-- <v-text-field :label="`title : ${qa_postname}`" solo> -->
        <v-text-field label="qa_postname" v-model="qa_postname" solo>
        </v-text-field>
        <v-textarea solo v-model="qa_content" height="400"></v-textarea>
        <v-layout row wrap justify-end>
          <v-flex shrink>
            <v-btn primary @click="qna_update(qa_postname, qa_content)"
              >수정</v-btn
            >
          </v-flex>
        </v-layout>
      </v-col>
    </div>
    <!-- qna를 생성할 경우! -->
    <div v-if="this.$route.params.create">
      <v-col cols="12" md="6">
        <v-text-field v-model="qa_postname" solo> </v-text-field>
        <v-textarea solo v-model="qa_content" height="400"></v-textarea>
        <v-layout row wrap justify-end>
          <v-flex shrink>
            <v-btn
              primary
              @click="qna_create(qa_postname, qa_content, qa_password)"
              >등록</v-btn
            >
          </v-flex>
        </v-layout>
      </v-col>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      qa_id: null,
      qa_postname: null,
      qa_content: null,
      qa_user: null,
      qa_password: null,
    };
  },
  mounted() {
    //detail(read or update)일 경우에만 마운트 할 때에 라우터로 넘어온 데이터를 매핑시킨다
    if (this.$route.params.detail) {
      this.qa_id = this.$route.params.obj[0].id;
      this.qa_postname = this.$route.params.obj[0].postname;
      this.qa_content = this.$route.params.obj[0].content;
      this.qa_user = this.$route.params.obj[0].qa_user;
    }
  },
  methods: {
    // qna 수정 메서드
    qna_update(patch_postname, patch_content) {
      this.$confirm("Q&A를 정말 수정하시겠습니까?").then((res) => {
        if (res) {
          axios({
            method: "patch",
            url: `http://127.0.0.1:8000/common/qa/${this.qa_id}/`,
            data: {
              postname: patch_postname,
              content: patch_content,
            },
          }).then((response) => {
            this.qa_id = response.data.qa_id;
            this.qa_postname = response.data.qa_postname;
            this.qa_content = response.data.qa_content;
            alert("게시글이 수정되었습니다.");
            this.$router.go(-1);
          });
        }
      });
    },
    // qna 생성 메서드
    // 백엔드에서 생성할 때, password가 '' 이거나 null일 경우에는 None으로 저장하게 해놓았기 때문에 패스워드를 미리 지정해놓아도 괜찮다.
    qna_create(post_postname, post_content, post_password) {
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/common/qa/",
        data: {
          postname: post_postname,
          content: post_content,
          password: post_password,
        },
        headers: {
          "X-CSRFToken": "csrftoken",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }).then(() => {
        alert("질문글이 저장되었습니다.");
        this.$router.go(-1);
      });
    },
  },
};
</script>
