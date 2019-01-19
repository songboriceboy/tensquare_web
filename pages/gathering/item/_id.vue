<template>
  <div>
    活动详情
    {{item.id}}
    <hr/>
    {{item.name}}
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
      asyncData({params}){
        return axios.get(`https://www.easy-mock.com/mock/5c3c576683a6d6013cad25cd/gathering/gathering/${item.id}`).then(res=>{
          return {item: res.data.data}
        })
      }
    }
</script>

<style scoped>

</style>
