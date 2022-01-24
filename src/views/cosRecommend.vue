<template>
  <div>
    <v-text-field label="Regular" v-model="title"></v-text-field>
    <v-file-input
      accept="image/*"
      label="File input"
      v-model="file"
    ></v-file-input>
    <v-progress-circular
      v-if="progress"
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>

    <v-btn color="grey lighten-1" depressed block large @click="imageUpload">
      추천!
    </v-btn>
  </div>
</template>

<script>
import axios from "axios"; // eslint-disable-line no-unused-vars
// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.withCredentials = true;

export default {
  data() {
    return {
      title: null,
      file: [],
      progress: false,
    };
  },
  methods: {
    imageUpload() {
      const image = new FormData();
      image.append("title", this.title);
      image.append("pic", this.file);
      this.progress_method();
      axios
        .post("http://127.0.0.1:8000/app/upload/", image, {
          headers: {
            "Content-Type": "multipart/form-data",
            //'X-CSRFToken': 'csrftoken',
          },
        })
        .then((response) => {
          this.$router.push({
            name: "recommendresult",
            params: { resultData: response.data },
          });
          console.log(response);
        });
    },
    progress_method() {
      this.progress = true;
    },
  },
};
</script>
