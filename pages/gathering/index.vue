<template>
    <div>
      活动列表
      <div v-for="(item,index) in items" :key="index">
        <nuxt-link :to="'/gathering/item/'+item.id">{{item.name}}</nuxt-link>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        asyncData(){
          return axios.get('https://www.easy-mock.com/mock/5c3c576683a6d6013cad25cd/gathering/gathering').then(res=>{
            return {items: res.data.data}
          })
        }
    }
</script>

<style scoped>

</style>
