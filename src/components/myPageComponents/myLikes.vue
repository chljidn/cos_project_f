<template>
  <div>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">brand</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="like in userInfo.like" :key="like">
            <td
              @click="
                $router.push({ name: 'cosdetail', params: { id: like.id } })
              "
              style="cursor: pointer"
            >
              {{ like.prdname }}
            </td>
            <td>{{ like.brand }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<style scoped>
</style>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["userInfo"]),
  },
};
</script>
