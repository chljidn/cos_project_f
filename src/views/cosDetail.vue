<template>
  <div>
    {{ cos.prdname }}

    <v-btn icon :color="btn_color" @click="cosLike">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cos: null,
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/app/cos_list/",
      params: {
        id: this.$route.params.id,
      },
    }).then((response) => {
      this.cos = response.data.results[0];
      console.log(this.cos);
    });
  },
};
</script>
