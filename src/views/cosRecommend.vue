<template>
    <div>
      <v-text-field
        label="Regular"
        v-model="title"
      ></v-text-field>
      <v-file-input
        accept="image/*"
        label="File input"
        v-model="file"
      ></v-file-input>

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
</template>


<script>
import axios from "axios" // eslint-disable-line no-unused-vars
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.withCredentials = true

export default {
  data () {
    return {
      title : null,
      file: []
    }
  },
  methods: {
    imageUpload() {
      const image = new FormData();
      image.append('title', this.title)
      image.append('pic', this.file)

    axios.post('http://127.0.0.1:8000/app/upload/'
    , image,
    {
      headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
          //'X-CSRFToken': 'csrftoken',
      }
    })
    .then(response => {
      console.log(response)
    })

    }
  }
}
</script>
