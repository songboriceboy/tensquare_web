<template>
  <div class="wrapper qa-content">

    <div class="qa-title">
      <div class="fl title">
        <h2>{{problem_item.title}}</h2>
        <p>
          <span class="tag">PHPPP</span>
          &nbsp;
          <span class="author">{{problem_item.nickname}}</span>&nbsp;
          <span>{{getDate(problem_item.updatetime)}}更新 · {{getDate(problem_item.createtime)}}发表</span>
        </p>
      </div>
      <div class="fr share">
        <h4>分享到：</h4>
        <div class="social-share" data-sites="qq,qzone,weibo">
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="fl left-list">
      <div class="problem-detail">
        <div class="title-intro">
          <div class="sidebar">

            <button type="button" class="like" data-placement="right" data-toggle="tooltip"
                    title="问题对人有帮助，内容完整，我也想知道答案"><i class="fa fa-caret-up" aria-hidden="true"></i></button>
            <span class="count">0</span>
            <button type="button" class="hate" data-placement="right" data-toggle="tooltip"
                    title="问题没有实际价值，缺少关键内容，没有改进余地"><i class="fa fa-caret-down" aria-hidden="true"></i></button>

          </div>
          <div class="title">
            <div class="detail">
              {{problem_item.content}}
            </div>
            <div class="clearfix"></div>
            <div class="operate">
              <span class="comment">评论</span>
              <span class="edit">编辑</span>
            </div>
          </div>

        </div>
        <div class="answer-intro">
          <h4 class="answer-num">{{problem_item.reply}}个回答</h4>

          <div class="sidebar">
            <button type="button" class="like" data-placement="right" data-toggle="tooltip"
                    title="问题对人有帮助，内容完整，我也想知道答案"><i class="fa fa-caret-up" aria-hidden="true"></i></button>
            <span class="count">0</span>
            <button type="button" class="hate" data-placement="right" data-toggle="tooltip"
                    title="问题没有实际价值，缺少关键内容，没有改进余地"><i class="fa fa-caret-down" aria-hidden="true"></i></button>
          </div>
          <div class="title" v-for="(item,index) in replyList" :key="index">
            <p>{{item.content}}</p>
            <div class="operate">
              <div class="tool pull-left">
                <span class="time">{{getDate(item.createtime)}}提问</span>
              </div>

              <div class="myanswer pull-right">
                <img src="#"> <a href="#">{{item.nickname}}</a>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
    <div class="fl right-tag">
      <div class="similar-problem">
        <h3 class="title">相似问题</h3>
        <ul class="problem-list">
          <li class="list-item">
            <p class="list-title">求一份浏览器中html css javascript jquery ajax的渲染顺序与原理！！</p>
            <p class="list-info"><a href="">1 回答</a> | 已解决</p>
          </li>
          <li class="list-item">
            <p class="list-title">求一份浏览器中html css javascript jquery ajax的渲染顺序与原理！！</p>
            <p class="list-info"><a href="">1 回答</a> | 已解决</p>
          </li>
          <li class="list-item">
            <p class="list-title">求一份浏览器中html css javascript jquery ajax的渲染顺序与原理！！</p>
            <p class="list-info"><a href="">1 回答</a> | 已解决</p>
          </li>
          <li class="list-item">
            <p class="list-title">求一份浏览器中html css javascript jquery ajax的渲染顺序与原理！！</p>
            <p class="list-info"><a href="">1 回答</a> | 已解决</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import '~/assets/css/page-sj-qa-detail.css'
  import problemApi from '@/api/problem'
  import {formatDate, getDateDiff} from '@/utils/formatdate'
  import replyApi from '@/api/reply'
  import axios from 'axios'
  import userAPi from '@/api/user'

  export default {
    asyncData({params}) {
      return axios.all([problemApi.findById(params.id), replyApi.findByProblemId(params.id)]).then(axios.spread(function (problem_item, replyList) {
        return {
          problem_item: problem_item.data.data,
          replyList: replyList.data.data
        }
      }))
    },
    head: {
      script: [
        {src: 'https://cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js'}
      ],
      link: [
        {rel: 'stylesheet', href: 'https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css'}
      ]
    },
    methods: {
      dataFormate(date) {
        return formatDate(date)
      },
      getDate(date) {
        return getDateDiff(date)
      },
      // replyPeople(userId){
      //   return userAPi.findById(userId).then(res=>{
      //     console.log(res.data.data.avatar)
      //   })
      // }
    }
  }
</script>

<style scoped>

</style>
