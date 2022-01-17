<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="qaList"
          class="elevation-1"
          @click:row="s(item)"
        >
        <template v-slot:item="{ item }">
          <tr @click="s(item)">
            <td>{{ item.postname }}</td>
            <td>{{ item.qa_user }}</td>
            <td>{{item.qaDate}}</td>
          </tr>
      </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>


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
      console.log(this.desserts)
      this.qaList = response.data.results
    })
  },
  methods:{
    s(item) {
      return item
    }
  }
}
</script>

