<template>
  <div class="wrapper tc-detail">
    <div class="fl left-list">
      <div class="tc-detail">
        <!-- 标题区 -->
        <div class="detail-tit">
          <div class="detail-author">
            <a href="javascript:;">{{pojo.nickname}}</a> &nbsp;{{getDate(pojo.publishtime)}}发布
          </div>
          <div class="ql-container ql-snow">
            <div class="ql-editor">
              <div v-html="pojo.content"></div>
            </div>
          </div>
          <div class="detail-tool">
            <ul>
              <li><a @click="thumbup()" class="zan"><i :class="'fa fa-thumbs-up '+zan" aria-hidden="true"></i>{{pojo.thumbup}}</a></li>
              <li><a @click="share()" data-toggle="modal" data-target="#shareModal"><i class="fa fa-share-alt"
                                                                               aria-hidden="true"></i>{{pojo.share}}</a>
              </li>
              <li><a @click="dialogVisible=true;reply.content=''" data-toggle="modal" data-target="#remarkModal"><i
                class="fa fa-commenting"
                aria-hidden="true"></i> {{pojo.comment}}</a></li>
            </ul>
          </div>
          <div style="text-align:right" :class="'content-item '+show">
            <div class="social-share" data-sites="qq,qzone,weibo,wechat">
            </div>
          </div>
        </div>
        <!-- 评论区 -->
        <div class="comment-area">
          <div class="comment-tit">
            <span>评论</span>
          </div>
          <ul class="comment-list">
            <li v-for="(item,index) in commentlist" :key="index">
              <div class="item-photo">
                <img src="~/assets/img/widget-widget-photo.png" alt=""/>
              </div>
              <div class="item-content">
                <p class="author"><a href="javascript:;">{{item.nickname}}</a>&nbsp;{{getDate(item.createtime)}} 发布</p>
                <p class="content" v-html="item.content"></p>
              </div>
              <div class="item-thumb">
                <div>
                  <a @click="commentzan(item._id,index)" class="zan"><i :class="'fa fa-thumbs-up '+mzan" aria-hidden="true"></i>{{item.thumbup}}</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="fl right-tag">
      <div class="block-btn">
        <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p>
        <nuxt-link to="/spit/submit" class="sui-btn btn-block btn-share">发表吐槽</nuxt-link>
      </div>
    </div>
    <div class="clearfix"></div>
    <el-dialog
      title="评论"
      :visible.sync="dialogVisible"
      width="40%">
      <div class="quill-editor"
           :content="reply.content"
           @change="onEditorChange($event)"
           v-quill:myQuillEditor="editorOption">
      </div>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="savecomment">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import '~/assets/css/page-sj-spit-detail.css'
  import spitApi from '@/api/spit'
  import axios from 'axios'
  import {formatDate, getDateDiff} from '@/utils/formatdate'
  import {getUser} from '@/utils/auth'

  export default {
    data(){
      return{
        reply:{
          _id:'',
          spitid:'',
          content:'',
          createtime:'',
          userid:'',
          nickname:''
        },
        dialogVisible: false,
        show:'hidden',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic'],
            ]
          }
        },
        zan:'',
        mzan:''
      }
    },
    asyncData({params}) {
      return axios.all([spitApi.findById(params.id), spitApi.commentlist(params.id)]).then(
        axios.spread(function (pojo, commentlist) {
          return {
            pojo: pojo.data.data,
            commentlist: commentlist.data.data
          }
        })
      )
    },
    methods: {
      onEditorChange({editor, html, text}) {
        this.reply.content = html
      },
      savecomment() {
        this.reply.nickname=getUser().name
        this.reply.spitid=this.pojo._id
        spitApi.savecomment(this.reply).then(res => {
          this.$message({
            message: res.data.message,
            type: (res.data.flag ? 'success' : 'error')
          })
          if (res.data.flag) {
            this.dialogVisible = false
            spitApi.commentlist(this.pojo._id).then(res => {
              this.commentlist = res.data.data
            })
          }
        })
      },
      getDate(date) {
        return getDateDiff(date)
      },
      thumbup() {
        if (getUser().name===undefined){
          this.$message({
            message:'必须登录后才能点赞哦~',
            type:'warning'
          })
          return
        }
        this.zan='color'
        spitApi.thumbup(this.pojo._id).then(res => {
          this.$message({
            message: res.data.message,
            type: (res.data.flag ? 'success' : 'error')
          })
          if (res.data.flag) {
            this.pojo.thumbup++
          }
        })
      },
      commentzan(id,index){
        if (getUser().name===undefined){
          this.$message({
            message:'必须登录后才能点赞哦~',
            type:'warning'
          })
          return
        }
        this.mzan='color'
        spitApi.commentzan(id).then(res => {
          this.$message({
            message: res.data.message,
            type: (res.data.flag ? 'success' : 'error')
          })
          if (res.data.flag) {
            this.commentlist[index].thumbup++
          }
        })
      },
      share() {
        if (this.show==='show'){
          this.show='hidden'
        } else if (this.show==='hidden') {
          this.show='show'
        }
      }
    },
    head: {
      script:[
        {src:'https://cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js'}
      ],
      link:[
        {rel:'stylesheet',href:'https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css'}
      ]
    },
  }
</script>
<style>
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
