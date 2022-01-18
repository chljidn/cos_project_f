<template>
  <v-container class="grey lighten-5">
    <div>
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
          <v-img :src="cos.image" height=100 width=100 />
          {{cos.prdname}} <br>
          {{cos.brand}} <br>
        </v-card>
        <v-btn
            icon
            @click="cosLike(cos.id, cos)"
            :color="btn_color_list[cos.id]"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    </div>
    <div>
      <v-pagination
        v-model="page_num"
        :length="count"
        :total-visible="7"
        @input="page_function(page_num)"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
    data () {
        return {
            cosList: null,
            page_num: 1,
            next: null,
            previus: null,
            idx: 0,
            count: null,
            // btn_color: 'disable',
            btn_color_list: Array()
        }
    },
    computed: {
			...mapState(["userInfo"]),
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
    },
    methods: {
      page_function(page_num) {
         axios.get('http://127.0.0.1:8000/app/cos_list/', 
         {
            params: {
                page: page_num
            }
        })
        .then(response => {
            // handle success
            // console.log(response);
            this.cosList = response.data.results
            this.next = response.data.next
            this.previous = response.data.previous
            this.count = parseInt(response.data.count/60)
            this.btn_color_list = Array(response.data.count).fill('disable')
            
            //유저가 좋아요 한 화장품의 id는 버튼 컬러를 pink로 처리. 
            for (var i = 0; i <= this.$store.state.userInfo.like.length; i++)
              this.btn_color_list.splice(this.$store.state.userInfo.like[i].id, 1, 'pink')
        })
        .catch(error => {
            
            console.log(error);
        })
      },
      cosLike(cosPk, cos_object) { // eslint-disable-line no-unused-vars

        // Dom에 배열이 변경된 것을 다시 리렌더링 하려면 splice같은 vue에서 지정된 함수를 써주어야 한다.
        // 지정되어 있는 함수들 : push(), pop(), shift(), unshift(), splice(), sort(), reverse()
        // this.btn_color_list[cosPk] = 'pink' 같은 형식으로 하면 리렌더링되지 않는다. 
        // 일단 2중 if문으로할까 하다가 이렇게 했는데 뭐가 더 나을지?...
        if (this.$store.state.userInfo !== null && this.btn_color_list[cosPk] === 'disable') 
          {
            this.btn_color_list.splice(cosPk, 1, 'pink')
          }
          else if (this.$store.state.userInfo !== null && this.btn_color_list[cosPk] === 'pink') 
          {
            this.btn_color_list.splice(cosPk, 1, 'disable'); 
          }
        
        // 수정된 좋아요가 마이페이지에 다시 갱신되기 위해서는 백엔드에서 수정된 유저 데이터를 다시 받아야 한다.
        // 그렇게 되면 계속적인 요청으로 백엔드에 부하가 걸리므로 방지해야 한다. 
        // 때문에 현재 프론트에 저장되어 있는 유저 데이터를 수정하고, 백엔드에서 데이터를 다시 받기를 요청하지는 않도록 한다.
        // 데이터의 무결성을 원한다면 다시 유저 데이터를 받는게 안전하기는 하다.
        // for (var i = 0; i <= this.$store.state.userInfo.like.length; i++)
        //   if (cosPk == this.$store.state.userInfo.like[i].id) {
        //     this.$store.state.userInfo.like.splice(i, 1)
        //     break;
        //   }
        //   else if (i == this.$store.state.userInfo.like.length && cosPk != this.$store.state.userInfo.like[i].id) {
        //     this.$store.state.userInfo.like.push(cos_object)
        //   }
        axios({ method: 'post', url: 'http://127.0.0.1:8000/app/coslike/',
          data : {
            pk: cosPk
          },
          headers : {
            "Authorization":`Bearer ${localStorage.getItem("access")}`,
          }

        })
      }
    }
}
</script>
