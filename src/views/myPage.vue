<template>
    <div>
        {{userInfo.name}}
        {{userInfo.email}}
        {{userInfo.sex}}
        {{userInfo.birth}}
    </div>
    
</template>

<script>
import {mapState} from "vuex"
export default {
    computed: {
        ...mapState(["userInfo"])
    }
}
</script>