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
              <span class="comment"><a @click="show(problem_item.id)">评论</a></span>
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
            <p v-html="item.content"></p>
            <div class="operate">
              <div class="tool pull-left">
                <span class="time">{{getDate(item.createtime)}}提问</span>
              </div>

              <div class="myanswer pull-right">
                <img src="~/assets/img/widget-widget-photo.png"> <a href="#">{{item.nickname}}</a>
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
    <el-dialog
      title="评论"
      :visible.sync="dialogVisible"
      width="40%">
      <div class="quill-editor"
           :content="content"
           @change="onEditorChange($event)"
           v-quill:myQuillEditor="editorOption">
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="savecomment">确 定</el-button>
        </span>
    </el-dialog>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import '~/assets/css/page-sj-qa-detail.css'
  import problemApi from '@/api/problem'
  import {formatDate, getDateDiff} from '@/utils/formatdate'
  import replyApi from '@/api/reply'
  import axios from 'axios'
  import {getUser} from '@/utils/auth'

  export default {
    asyncData({params}) {
      return axios.all([problemApi.findById(params.id), replyApi.findByProblemId(params.id)]).then(axios.spread(function (problem_item, replyList) {
        return {
          problem_item: problem_item.data.data,
          replyList: replyList.data.data
        }
      }))
    },
    data() {
      return {
        reply: {
          id: '',
          problemid: '',
          content: '',
          createtime: '',
          updatetime: '',
          userid: '',
          nickname: '',
        },
        dialogVisible: false,
        content: '',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic'],
            ]
          }
        },
      }
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
      show(id) {
        this.reply.problemid=id
        this.dialogVisible = true
      },
      onEditorChange({editor, html, text}) {
        this.reply.content = html
      },
      savecomment() {
        this.reply.nickname=getUser().name
        replyApi.save(this.reply).then(res=>{
          this.$message({
            message: res.data.message,
            type: (res.data.flag ? 'success' : 'error')
          })
          if (res.data.flag) {
            this.dialogVisible = false
            replyApi.findByProblemId(this.problem_item.id).then(res => {
              this.replyList = res.data.data
              this.problem_item.reply++
            })
          }
        })
      }
      // replyPeople(userId){
      //   return userAPi.findById(userId).then(res=>{
      //     console.log(res.data.data.avatar)
      //   })
      // }
    }
  }
</script>
