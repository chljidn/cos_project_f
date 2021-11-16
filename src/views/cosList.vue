<template>
  <v-container class="grey lighten-5">
    <v-row>
      <!-- 12(cols) 기준으로 12/4(md) == 3이므로 각 행에 3개의 열이 들어간다 -->
      <v-col
      v-for="cos in cosList"
      :key="cos.prdname"
      cols="12"
      sm="6"
      md="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
          router :to="{name:'cosdetail', params: {id: cos.id}}"
        >
        </v-card>
          <v-img :src="cos.image" height=100 width=100 />
          {{cos.prdname}} <br>
          <v-btn
              icon
              :color="btn_color"
              @click="cosLike"
            >
              <v-icon>mdi-heart</v-icon>
          </v-btn>
      </v-col>
    </v-row>

    <v-pagination
      v-model="page_num"
      :length="count"
      :total-visible="7"
      @input="page_function(page_num)"
    ></v-pagination>
  </v-container>
</template>

<script>
import axios from "axios"

export default {
    data () {
        return {
            cosList: null,
            page_num: 1,
            next: null,
            previus: null,
            idx: 0,
            count: null,
            btn_color: 'diable'
        }
    },
    mounted () {
      // axios.get('http://127.0.0.1:8000/app/cos_list/', {
      //     params: {
      //     }
      //   })
      //   .then(response => {
      //     // handle success
      //     console.log(response);
      //     this.cosList = response.data.results
      //     this.next = response.data.next
      //     this.previous = response.data.previous
      //     this.count = parseInt(response.data.count/60)
      //   })
      //   .catch(error => {
      //       // handle error
      //       console.log(error);
      //   });
      this.page_function(this.page_num)
      console.log(this.btn_col_list[0])
    },
    methods: {
      page_function(page_num) {
         axios.get('http://127.0.0.1:8000/app/cos_list/', {
            params: {
                page: page_num
            }
        })
        .then(response => {
            // handle success
            console.log(response);
            this.cosList = response.data.results
            this.next = response.data.next
            this.previous = response.data.previous
            this.count = parseInt(response.data.count/60)
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
      },
      cosLike() {
        if (this.btn_color === 'disable') this.btn_color='pink'
        else this.btn_color = 'disable'
        axios({
          method: 'post',
          url: '127.0.0.1:8000/app/coslike/',
          
        })
      }
    }
}
</script>
