<template>
  <v-container>
    <!-- <div>
      <ul v-for="review in reviews" :key="review">
        <li>
          {{review.reviewName}}
          {{review.reviewContent}}
        <img :src="'127.0.0.1:8000'+review.reviewImage" />
        </li>
      </ul>
    </div> -->
    <!-- ----------------------->
    <v-row>
      <!-- 12(cols) 기준으로 12/4(md) == 3이므로 각 행에 3개의 열이 들어간다 -->
      <v-col v-for="review in reviews" :key="review" cols="12" sm="6" md="4">
        <v-card class="rounded-lg" outlined tile>
          <img
            :src="'http://127.0.0.1:8000' + review.reviewImage"
            height="100"
            width="100"
            @click="modalClick"
          />
          <br />
          {{ review.reviewName }}
        </v-card>
        <modal
          :reviewId="review.id"
          :reviewName="review.reviewName"
          :reviewUser="review.reviewUser"
          :reviewContent="review.reviewContent"
          :reviewImage="review.reviewImage"
          :reviewCos="review.reviewCos"
        ></modal>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import reviewModal from "../reviewComponents/reviewModal";

export default {
  data() {
    return {
      reviews: this.$store.state.userInfo.reviews,
      visible: false,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapActions(["update"]),
    modalClick() {
      // 이렇게 mutation으로 state의 변수를 바꾸어 주어야 한다. this.$store.state로 변경하면 그 결과가 바로 적용되지 않는다.
      this.$store.commit("checkReviewModal");
    },
  },
  components: {
    modal: reviewModal,
  },
  mounted() {
    console.log(this.reviews);
  },
};
</script>
