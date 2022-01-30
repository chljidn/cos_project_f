<template>
  <div class="recommand-background-class">
    <div class="recommand-content-class">
      <div class="recommand-file-class">
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
      </div>
      <div class="recommand-btn-class">
        <v-btn
          color="grey lighten-1"
          depressed
          block
          large
          @click="imageUpload"
        >
          추천!
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommand-background-class {
  border: solid 1px;
  padding: 30px;
  text-align: center;
  width: 100%;
  height: 100%;
}

.recommand-content-class {
  width: 50%;
  /* 현재의 div가 가운데 정렬되기 위해서는 상위의 div에 text-align:center이 정의되고, 여기서는 display: inline-block가 정의되어 있어야 한다. */
  display: inline-block;
}
</style>

<script>
import axios from "axios";

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
