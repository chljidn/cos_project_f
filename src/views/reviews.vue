<template>
  <v-container>
    <v-row>
      <v-col
        v-for="review in reviews_list"
        :key="review.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="rounded-lg" outlined tile>
          <img :src="review.reviewImage" height="100" width="100" />
          <br />
          {{ review.reviewName }}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      reviews_list: null,
    };
  },
  mounted() {
    axios.get("http://127.0.0.1:8000/app/cos_review/").then((response) => {
      console.log(response.data[0]);
      this.reviews_list = response.data;
    });
  },
  components: {},
};
</script>
