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
      <v-col
      v-for="review in reviews"
      :key="review"
      cols="12"
      sm="6"
      md="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
        </v-card>
          <img :src="'http://127.0.0.1:8000'+review.reviewImage" height=100 width=100 
          @click="handleClickButton"
          />
          <!-- {{review.reviewName}} <br> -->
          <app-my-modal
          title="this is modal"
          :visible="visible">
          <div>
            this is modal body
          </div>
          </app-my-modal>
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
import {mapState, mapActions} from "vuex"
import reviewModal from "../reviewComponents/reviewModal"

export default {
  data () {
			return {
          reviews:this.$store.state.userInfo.reviews,
          visible: false
			}
	},
	computed: {
			...mapState(["userInfo"]),
	},
	methods: {
			...mapActions(["update"]),
      handleClickButton() {
        this.visible = !this.visible
      }
	},
  components: {
    appMyModal: reviewModal
  },
  mounted () {
    // console.log(this.reviews.reviewName)
  }
}
</script>