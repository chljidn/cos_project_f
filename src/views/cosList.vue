<template>
    <div>
        <div class='list' v-for="cos in cosList" :key="cos.prdname">
            <img :src="cos.image"> <br>
            이름: <a>{{cos.prdname}}</a><br>
            브랜드: <a>{{cos.brand}}</a><br>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data () {
        return {
            cosList: null,
            limit: 60, // parameter : 화장품 가져올 갯수
            offset:0 // 몇 번부터 +60개까지 가져올 것인지
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
