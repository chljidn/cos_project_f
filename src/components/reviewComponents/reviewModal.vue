<template>
  <transition name="modal" appear>
    <div class="review-modal-background" v-if="reviewModalWindow">
      <div class="review-modal-wrap">
        <div class="review-modal-title">
          <h4>제목 : {{ reviewName }}</h4>
        </div>
        <div class="review-modal-content">
          <textarea
            :value="reviewContent"
            :v-model="update_reviewContent"
          ></textarea>
        </div>
        <div>
          <img
            :src="'http://127.0.0.1:8000' + reviewImage"
            height="100"
            width="100"
          />
        </div>
        <div class="review-modal-reple">reple</div>
        <div class="review-modal-btn">
          <v-btn @click="closeModal"> 확인 </v-btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.review-modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Div 안의 content와 div 테두리 선과의 간격(즉, review-modal-wrap와 현재 div의 테두리 선과의 간격) */
  padding: 100px;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
}
.review-modal-wrap {
  position: fixed;
  /* 이 부분은 가져온 것. */
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  background-color: white;
  /* border: 1px solid; */
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  width: 50%;
  height: 70%;
  /* 내부 컨텐츠가 div영역을 넘어갔을 때 어떻게 할지 설정 */
  /* visible(벗어난 부분의 내용을 있는 그대로 출력), hidden(벗어난 부분을 출력하지 X) */
  /* scroll(스크롤을 생성), auto(내용이 div를 벗어났을 때에만 스크롤을 생성) */
  overflow: auto;
}

.review-modal-title {
  margin: 20px;
  /* display: flex; */
  text-align: center;
  justify-content: center;
  /* border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4); */
  border-bottom: solid 1px;
}

.review-modal-content {
  margin: 20px;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}
.review-modal-reple {
  margin: 20px;
  /* height: 15%; */
  border: 1px solid;
}
.review-modal-btn {
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  box-sizing: border-box;
  border: 1px solid;
  float: right;
}

.modal-enter-active {
  transition: opacity 0.5s ease;
}
.modal-leave-active {
  /* opacity :  요소의 투명도 지정(0.0 (투명) ~ 1.0 (불투명)) */
  /* transform : 요소를 회전시킴 */
  /* transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1); */
  transition: opacity 0.5s ease;
}
.modal-enter,
.modal-leave-to {
  /* transform: translateX(10px); */
  opacity: 0;
}
</style>

<script>
import { mapState } from "vuex";
// import axios from "axios";
export default {
  data() {
    return {
      update_reviewContent: null,
    };
  },
  props: [
    "reviewId",
    "reviewName",
    "reviewUser",
    "reviewContent",
    "reviewImage",
    "reviewCos",
  ],
  computed: {
    ...mapState(["reviewModalWindow"]),
  },
  methods: {
    closeModal() {
      this.$store.state.reviewModalWindow =
        !this.$store.state.reviewModalWindow;
    },
    // updateReview() {
    //   axios.patch({
    //     url: `http://127.0.0.1:8000/app/cos_review/${this.props.reviewId}/`,
    //     data : {},
    //     headers: {
    //       "X-CSRFToken": "csrftoken",
    //       Authorization: `Bearer ${localStorage.getItem("access")}`,
    //     },
    //   });
    // },
  },
};
</script>
