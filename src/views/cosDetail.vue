<template>
  <div class="cos_background">
    <div class="cos_detail_first_ground">
      <div class="cos_info">
        <div class="cos_image">
          <v-img :src="cos.image" width="100%" height="100%" />
          <!-- <v-img :src="cos.image" /> -->
          <!-- <v-img :src="cos.image" style="background-size: cover" /> -->
        </div>
        <div class="cos_text">
          <dl>
            <dd style="font-size: xx-large">{{ cos.prdname }}</dd>
            <dd style="font-size: x-large; color: red; font-weight: bolder">
              {{ cos.price }}
            </dd>
          </dl>
          <v-btn icon :color="btn_color" @click="cosLike(cos.id, cos)">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="cos_review">
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" style="text-align: center">작성자</th>
                <th class="text-left">리뷰 제목</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="id in cos.cosreviewmodel_set" :key="id">
                <td>{{ id.reviewUser }}</td>
                <td>{{ id.reviewName }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cos_background {
  width: 100%;
  height: 100%;
  /* border: 5px solid; */
  padding: 20px;
}
.cos_detail_first_ground {
  height: 100%;
  /* border: 2px solid; */
  padding: 10px;
}
.cos_info {
  height: 50%;
  width: 70%;
  margin-left: 15%;
  float: top;
  /* border: 1px solid; */
  object-fit: contain;
  padding: 10px;
}
.cos_image {
  height: 80%;
  width: 30%;
  float: left;
  object-fit: cover;
  /* border: 1px solid; */
}
.cos_text {
  height: 80%;
  width: 65%;
  margin-top: 10px;
  float: right;
  /* border: 1px solid; */
}
.cos_review {
  margin-top: 30px;
  margin-left: 20%;
  height: 40%;
  width: 60%;
  float: bottom;
  /* border: 1px solid; */
}
</style>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      cos: null,
      btn_color: "disable",
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  mounted() {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/app/cos_list/",
      // cos_list는 url mapping을 사용하지 않았기 때문에 쿼리 파라미터로 보내주어야 함.
      params: {
        id: this.$route.params.id,
      },
    }).then((response) => {
      this.cos = response.data.results[0];
      if (this.userInfo) {
        for (let i = 0; i <= this.userInfo.like.length; i++) {
          if (this.cos.id == this.userInfo.like[i].id) {
            this.btn_color = "pink";
          }
        }
      }
    });
  },
  methods: {
    cosLike(cosPk, cos) {
      // eslint-disable-line no-unused-vars
      if (this.$store.state.userInfo !== null && this.btn_color == "disable") {
        this.btn_color = "pink";
      } else if (
        this.$store.state.userInfo !== null &&
        this.btn_color == "pink"
      ) {
        this.btn_color = "disable";
      }

      // 수정된 좋아요가 마이페이지에 다시 갱신되기 위해서는 백엔드에서 수정된 유저 데이터를 다시 받아야 한다.
      // 때문에 현재 프론트에 저장되어 있는 유저 데이터를 수정하고, 백엔드에서 데이터를 다시 받기를 요청하지는 않도록 한다.
      // 데이터의 무결성을 원한다면 다시 유저 데이터를 받는게 안전하기는 하다.
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/app/coslike/",
        data: {
          pk: cosPk,
        },
        headers: {
          Authorization: `Bearer ${this.$cookies.get("access")}`,
        },
      }).then((response) => {
        if (response.status == 200) {
          console.log(cos);
          var idx = 0;
          var len = this.userInfo.like.length;
          while (idx <= len) {
            if (this.userInfo.like[idx].prdname == cos.prdname) {
              console.log(this.userInfo.like[idx].prdname, cos.prdname);
              this.userInfo.like.splice(idx, 1);
              break;
            }
            idx++;
          }
        } else if (response.status == 201) {
          this.userInfo.like.push(cos);
        }
      });
    },
  },
};
</script>
