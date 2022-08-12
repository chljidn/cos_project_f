<template>
  <v-container>
    <header></header>
    <body>
      <div class="total-background">
        <div class="table-background">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">title</th>
                  <th class="text-left">user</th>
                  <th class="text-left">date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="qa in qaList" :key="qa.id" class="qa-row">
                  <td @click="qa_detail(qa.id)">{{ qa.postname }}</td>
                  <td>{{ qa.qa_user }}</td>
                  <td>{{ qa.qaDate }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <button
            v-if="isLogin"
            style="float: right"
            @click="
              $router.push({ name: 'qnadetail', params: { create: true } })
            "
          >
            글쓰기
          </button>
          <div>
            <v-pagination
              v-model="page_num"
              :length="count"
              :total-visible="7"
              @input="qnaList(page_num)"
            ></v-pagination>
          </div>
        </div>
      </div>
    </body>
    <footer></footer>
  </v-container>
</template>

<style>
/* 제목을 눌렀을 때 마우스 커서의 모양을 포인터를 가리키는 모양으로 바꾸기 위함. */
.qa-row {
  cursor: pointer;
}
.total-background {
  padding: 30px;
  padding-top: 50px;
}
.table-background {
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
</style>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      loading: false,
      headers: [
        {
          text: "제목",
          align: "start",
          sortable: true,
          value: "postname",
        },
        { text: "작성자", value: "qa_user" },
        { text: "date", value: "qaDate" },
      ],
      qaList: [],
      page_num: 1,
      next: null,
      previus: null,
      idx: 0,
      count: null,
    };
  },
  mounted() {
    this.qnaList(this.page_num);
  },
  computed: {
    ...mapState(["isLogin"]),
  },
  methods: {
    qnaList(qa_page) {
      axios
        .get("http://127.0.0.1:8000/common/qa/", {
          params: {
            page: qa_page,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          this.qaList = response.data.results;
          this.next = response.data.next;
          this.previous = response.data.previous;
          this.count = Math.ceil(response.data.count / 15);
        });
    },
    ...mapActions(["qa_detail"]),
  },
};
</script>
