<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="qaList"
          class="elevation-1"
        >
        <template v-slot:item="{ item }">
          <!-- vutify의 data table에서 router :to="{name: 'qnadetail', params: {id: item.id}}" 이 방식은 작동이 안됨 -->
          <tr class="qa-row">
            <td 
              @click="$router.push({name: 'qnadetail', params: {id: item.id}})"
            >{{ item.postname }}</td>
            <td>{{ item.qa_user }}</td>
            <td>{{item.qaDate}}</td>
          </tr>
      </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
  .qa-row {
    cursor: pointer;
  }
</style>

<script>
import axios from "axios"
// import dayjs from "dayjs"
export default {
  data () {
    return {
      loading: false,
      headers: [
        {
          text: 'postname',
          align: 'start',
          sortable: false,
          value: 'postname'
        },
        { text: 'id', value: 'id' },
      ],
      qaList: [],
    }
  },
  mounted() {
    axios.get(
      "http://127.0.0.1:8000/common/qa/"
    )
    .then(response => {
      console.log(response.data.results)
      this.qaList = response.data.results
    })
  },
  methods:{
  }
}
</script>