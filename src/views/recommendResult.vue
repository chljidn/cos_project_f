<template>
  <v-container class="grey lighten-5">
      <div>
      <v-row>
        <!-- 12(cols) 기준으로 12/4(md) == 3이므로 각 행에 3개의 열이 들어간다 -->
        <v-col
        v-for=" each_object in resultObject"
        :key="each_object.prdname"
        cols="12"
        sm="6"
        md="4"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            <v-img :src="each_object.image" height=100 width=100 />
            {{each_object.prdname}} <br>
            {{each_object.brand}} <br>
          </v-card>
        </v-col>
      </v-row>
      </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      resultObject : null,
    }
  },
  mounted () {
    // params로 받은 화장품 객체들
    this.resultObject = this.$route.params.resultData
    console.log(this.resultObject)
  },
  methods : {
    check_password () {
      
    }
  }
}
</script>
