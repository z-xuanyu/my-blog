<template>
    <div class="index">
        <v-header></v-header>
        <v-main></v-main>
    </div>
</template>
<script>
import Header from '../../components/Layout/Header'
import Main from '../../components/Layout/Main'
export default {
    name:"Index",
    components:{
        "v-header":Header,
        "v-main":Main
    }
}
</script>