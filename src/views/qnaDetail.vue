<template>
  <div class="qna-detail-background-class" style="padding: 30px">
    <!-- qna를 읽거나 수정하는 경우 -->
    <div class="qna-head-content-class">
      <v-col cols="12" md="6">
        <!-- <v-text-field :label="`title : ${qa_postname}`" solo> -->
        <v-text-field v-model="qa_postname" solo> </v-text-field>
        <v-textarea
          solo
          v-model="qa_content"
          height="400"
          styld="width: 100%"
        ></v-textarea>
        <!-- 로그인 되어있지 않다면 생성, 수정, 삭제 버튼이 보이지 않는다. -->
        <v-layout row wrap justify-end v-if="check_user">
          <input
            style="float: left; border: 1px solid; margin-left: 3%"
            type="password"
            v-model="qa_password"
          />
          &nbsp;&nbsp;password

          <v-flex v-if="this.$route.params.detail" style="float: right">
            <button
              primary
              @click="qna_delete()"
              style="margin-left: 5px; float: right"
            >
              삭제
            </button>

            <button
              primary
              @click="qna_update(qa_postname, qa_content)"
              style="float: right; margin-right: 2%"
            >
              수정
            </button>
          </v-flex>
        </v-layout>
        <v-flex shrink v-if="this.$route.params.create">
          <input
            style="float: left; border: 1px solid; margin-left: 3%"
            type="password"
            v-model="qa_password"
          />
          &nbsp;&nbsp;password
          <v-btn
            primary
            @click="qna_create(qa_postname, qa_content, qa_password)"
            style="float: right"
            >등록</v-btn
          >
        </v-flex>
        <v-checkbox
          v-model="del_password"
          label="패스워드 삭제"
          style="float: left; margin-left: 3%"
          v-if="check_user"
        ></v-checkbox>
      </v-col>
    </div>
    <div class="qna-reple-class" v-if="this.$route.params.detail">
      <p style="margin-left: 15%; font-size: x-large">댓글</p>
      <v-textarea
        outlined
        name="input-7-4"
        label="Reple"
        value=""
        v-model="now_reple"
        style="width: 60%; margin-left: 20%"
      ></v-textarea>
      <button
        v-if="isLogin"
        @click="reple_create(now_reple)"
        style="float: right; margin-right: 20%; display: flex"
      >
        create
      </button>
      <table
        class="qna-reple-table-class"
        style="
          width: 60%;
          margin-left: 20%;
          border-collapse: collapse;
          margin-top: 60px;
        "
      >
        <thead>
          <th style="text-align: center">content</th>
          <th>user</th>
        </thead>
        <tbody>
          <tr
            style="
              border-bottom: 2px solid grey;
              border-bottom-color: grey;
              height: 50px;
            "
            v-for="(reple, index) in qa_reples"
            :key="reple.id"
          >
            <td
              style="
                padding-bottom: 2px;
                padding-left: 3px;
                text-align: '.';
                width: 60%;
              "
              th:inline="text"
            >
              <p
                style="margin-left: 5%; margin-top: 5%"
                v-html="reple.content"
              ></p>
            </td>
            <td
              style="
                text-align: center;
                width: 20%;
                border-left: 1px solid grey;
              "
            >
              {{ reple.repleUser.slice(0, reple.repleUser.length - 3) }}***
            </td>
            <td
              style="width: 10%; text-align: center; cursor: pointer"
              v-if="isLogin && reple.repleUser == userInfo.username"
              @click="reple_delete(reple.id, index)"
            >
              delete
            </td>
            <td v-else></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.qna-detail-background-class {
  /* border: 3px solid; */

  justify-content: center;
}
.qna-head-content-class {
  position: relative;
  width: 70%;
  height: 80%;
  margin-left: 15%;
  display: flex;

  justify-content: center;
  /* border: 1px solid; */
}

.qna-reple-class {
  padding-top: 10px;
  border-top: 1px solid;
  position: relative;
  width: 60%;
  height: 80%;

  margin-left: 20%;
}
.qna-reple-table-class {
  /* border: 1px solid; */
  width: 100%;
}
</style>

<script>
import axios from "axios";
import { mapState } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default {
  data() {
    return {
      qa_id: null,
      qa_postname: null,
      qa_content: null,
      qa_reples: [],
      qa_password: null,
      del_password: false,
      now_reple: "",
      check_user: false,
    };
  },
  computed: {
    ...mapState(["isLogin", "userInfo", "now_qa_data"]),
  },
  mounted() {
    //detail(read or update)일 경우에만 마운트 할 때에 라우터로 넘어온 데이터를 매핑시킨다
    if (this.$route.params.detail) {
      this.qa_id = this.now_qa_data.id;
      this.qa_postname = this.now_qa_data.postname;
      this.qa_content = this.now_qa_data.content;
      this.qa_reples = this.now_qa_data.qareple_set;

      for (let i = 0; i < this.qa_reples.length; i++) {
        this.qa_reples[i].content = this.qa_reples[i].content
          .split("\n")
          .join("<br>");
      }
      if (this.isLogin & (this.now_qa_data.qa_user == this.userInfo.username)) {
        this.check_user = true;
      }
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
              this.$store.commit("qa_data_mounted", response.data);
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
              this.$store.commit("qa_data_delete");
              alert("질문글이 삭제되었습니다.");
              this.$router.go(-1);
            })
            .catch((error) => {
              alert(error.response.data.message);
            });
        }
      });
    },
    reple_create(reple_content) {
      axios({
        method: "post",
        url: `http://127.0.0.1:8000/common/qa_reple/`,
        data: { content: reple_content, pk: this.qa_id },
        headers: {
          "X-CSRFToken": "csrftoken",
          Authorization: `Bearer ${this.$cookies.get("access")}`,
        },
      })
        .then((response) => {
          alert("댓글이 등록되었습니다.");
          response.data.content = response.data.content
            .split("\n")
            .join("<br>");
          this.$store.commit("qa_reple_mounted", response.data);
          this.now_reple = "";
        })
        .catch((err) => {
          console.log(err.response.data);
          alert(err.response.data.message);
        });
    },
    reple_delete(id, idx) {
      var check = confirm("댓글을 삭제하시겠습니까?");
      if (check) {
        axios({
          method: "delete",
          url: `http://127.0.0.1:8000/common/qa_reple/${id}`,
          headers: {
            "X-CSRFToken": "csrftoken",
            Authorization: `Bearer ${this.$cookies.get("access")}`,
          },
        })
          .then(() => {
            alert("댓글이 삭제되었습니다.");
            this.$store.commit("qa_reple_delete", idx);
          })
          .catch((err) => {
            console.log(err.response.data);
            alert(err.response.data.message);
          });
      }
    },
  },
  plugins: [createPersistedState()],
};
</script>
