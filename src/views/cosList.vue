
<template>
  <div>
    <v-container
      v-for="cos in 20"
      :key="cos"
      class="grey lighten-5 mb-6"
    >
      <v-row
        :align="cos"
        no-gutters
        style="height: 150px;"
      >
        <v-col
          v-for="n in 3"
          :key="n"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            <!-- {{cosList[listIndex()].prdname}} -->
            <!-- <img :src="cos.image"> -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios"

export default {
    data () {
        return {
            cosList: null,
            limit: 60, // parameter : 화장품 가져올 갯수
            offset:0, // 몇 번부터 +60개까지 가져올 것인지
            alignments: [
              'start',
              'center',
              'end',
            ],
            idx: 0,
        }
    },
    methods: {
      listIndex() {
        console.log(this.idx)
        return this.idx ++
      }
    }, 
    mounted () {
        axios
        .get('http://127.0.0.1:8000/app/cos_list/', {
            params: {
                limit: 60, 
                offset: this.offset+60,
            }
        })
        .then(response => {
            // handle success
            console.log(response);
            this.cosList = response.data.results
        })
        .catch(error => {
            // handle error
            console.log(error);
        });
    }
}
</script>
