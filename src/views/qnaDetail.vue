<template>
  <div class="qna-detail-background-class" style="padding: 30px">
    <!-- qna를 읽거나 수정하는 경우 -->
    <div class="qna-head-content-class">
      <v-col cols="12" md="6">
        <!-- <v-text-field :label="`title : ${qa_postname}`" solo> -->
        <v-text-field v-model="qa_postname" solo> </v-text-field>
        <v-textarea solo v-model="qa_content" height="400"></v-textarea>
        <!-- 로그인 되어있지 않다면 생성, 수정, 삭제 버튼이 보이지 않는다. -->
        <v-layout row wrap justify-end v-if="isLogin">
          <v-flex shrink v-if="this.$route.params.detail">
            <v-btn primary @click="qna_update(qa_postname, qa_content)"
              >수정</v-btn
            >
            <v-btn primary @click="qna_delete()">삭제</v-btn>
          </v-flex>
          <v-flex shrink v-if="this.$route.params.create">
            <v-btn
              primary
              v-if="this.$route.params.create"
              @click="qna_create(qa_postname, qa_content, qa_password)"
              >등록</v-btn
            >
          </v-flex>
        </v-layout>
      </v-col>
    </div>
    <input type="password" v-model="qa_password" />password
    <p>{{ password }}</p>
    <v-checkbox v-model="del_password" label="패스워드 삭제"></v-checkbox>
    <div class="qna-reple-class" v-if="this.$route.params.detail">
      댓글
      <table class="qna-reple-table-class">
        <thead>
          <th>content</th>
          <th>user</th>
        </thead>
        <tbody>
          <tr v-for="reple in qa_reples" :key="reple.id">
            <td
              style="
                border-bottom: solid 1px;
                padding-bottom: 2px;
                padding-left: 3px;
                text-align: '.';
              "
            >
              {{ reple.content }}
            </td>
            <td style="text-align: center">{{ reple.repleUser }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.qna-detail-background-class {
}
.qna-head-content-class {
  position: relative;
}

.qna-reple-class {
  padding-top: 10px;
  /* border: solid 1px; */
}
.qna-reple-table-class {
  width: 100%;
}
</style>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      qa_id: null,
      qa_postname: null,
      qa_content: null,
      qa_user: null,
      qa_reples: null,
      qa_password: null,
      del_password: false,
    };
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  mounted() {
    //detail(read or update)일 경우에만 마운트 할 때에 라우터로 넘어온 데이터를 매핑시킨다
    if (this.$route.params.detail) {
      console.log(this.$route.params.obj);
      this.qa_id = this.$route.params.obj.id;
      this.qa_postname = this.$route.params.obj.postname;
      this.qa_content = this.$route.params.obj.content;
      this.qa_reples = this.$route.params.obj.qareple_set;
    }
  },
  methods: {
    // qna 생성 메서드
    // 백엔드에서 생성할 때, password가 '' 이거나 null일 경우에는 None으로 저장하게 해놓았기 때문에 패스워드를 미리 지정해놓아도 괜찮다.
    qna_create(post_postname, post_content, post_password) {
      this.$confirm("질문글을 이대로 저장하시겠습니까?").then((res) => {
        if (res) {
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
              Authorization: `Bearer ${this.$cookies.get("access")}`,
            },
          })
            .then(() => {
              alert("질문글이 저장되었습니다.");
              this.qa_password = null; // 패스워드 초기화
              this.$router.go(-1);
            })
            .catch((error) => {
              console.log(error.response);
            });
        }
      });
    },
    // qna 수정 메서드
    qna_update(patch_postname, patch_content) {
      var data = {
        postname: patch_postname,
        content: patch_content,
      };
      if (this.del_password == true || this.qa_password) {
        // this.$delete(data, "password");
        this.$set(data, "password", this.qa_password);
      }
      this.$confirm("Q&A를 정말 수정하시겠습니까?").then((res) => {
        if (res) {
          axios({
            method: "patch",
            url: `http://127.0.0.1:8000/common/qa/${this.qa_id}/`,
            data,
            headers: {
              "X-CSRFToken": "csrftoken",
              Authorization: `Bearer ${this.$cookies.get("access")}`,
            },
          })
            .then((response) => {
              this.qa_id = response.data.qa_id;
              this.qa_postname = response.data.qa_postname;
              this.qa_content = response.data.qa_content;
              // this.$router.go();
              alert("질문글이 수정되었습니다.");
              this.qa_password = null;
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
        }
      });
    },
    // qna 삭제 메서드
    qna_delete() {
      this.$confirm("Q&A를 정말 삭제하시겠습니까?").then((res) => {
        if (res) {
          axios({
            method: "delete",
            url: `http://127.0.0.1:8000/common/qa/${this.qa_id}/`,
            headers: {
              "X-CSRFToken": "csrftoken",
              Authorization: `Bearer ${this.$cookies.get("access")}`,
            },
          })
            .then(() => {
              alert("질문글이 삭제되었습니다.");
              this.$router.go(-1);
            })
            .catch((error) => {
              console.log(error);
              alert(error.response.data.message);
            });
        }
      });
    },
  },
};
</script>
