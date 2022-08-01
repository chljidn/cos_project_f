<template>
  <div>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">타이틀</th>
            <th class="text-left">날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in myrecommend_list" :key="r">
            <td @click="file_download(r.file_title)" style="cursor: pointer">
              {{ r.file_title }}
            </td>
            <td>{{ r.created_at }}</td>
            <p @click="file_delete(r.file_title)" style="cursor: pointer">
              삭제
            </p>
            <!-- <v-btn elevation="2" x-small @click="file_delete(r.file_title)"> -->
            <!-- 삭제</v-btn -->
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<style scoped>
</style>

<script>
import { mapState } from "vuex";
import axios from "axios";
import FileSaver from "file-saver";
export default {
  data() {
    return {
      myrecommend_list: null,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  mounted() {
    axios
      .get(
        `http://127.0.0.1:8000/app/recommend_excel_list/${this.userInfo.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("access")}`,
          },
        }
      )
      .then((response) => {
        this.myrecommend_list = response.data;
        console.log(response.data);
      });
  },
  methods: {
    file_download(file_name) {
      // axios.get(`http://127.0.0.1:8000/app/recommend_excel/${file_name}`, {
      axios
        .get(`http://127.0.0.1:8000/app/recommend_excel/${file_name}`, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("access")}`,
          },
          responseType: "blob",
        })
        .then((response) => {
          FileSaver.saveAs(response.data, file_name + ".xlsx");
        });
    },
    file_delete(file_name) {
      axios
        .delete(`http://127.0.0.1:8000/app/recommend_excel/${file_name}`, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("access")}`,
          },
        })
        .then((response) => {
          alert(response.data.message);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>
