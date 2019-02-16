<template>
  <div>
    <div class="wrapper tag-item">
      <div class="fl left-list">
        <div class="tc-data-list">
          <div class="tc-list" v-infinite-scroll="loadMore">
            <ul class="detail-list">
              <li class="qa-item" v-for="(item,index) in items" :key="index">
                <div class="fl record">
                  <div class="number">
                    <div class="border useful">
                      <p class="usenum" @click="thumbup(index)"><a href="#" class="zan"><i :class="'fa fa-thumbs-up '+item.zan " aria-hidden="true"></i></a>
                      </p>
                      <p class="zannum"> {{item.thumbup}} </p>
                    </div>
                    <div class="border answer">
                      <a href="#" class="star"><i class="fa fa-star-o" aria-hidden="true"></i></a>
                    </div>
                  </div>
                </div>
                <div class="info">
                  <p class="text">
                    <nuxt-link :to="'/spit/item/'+item._id"> {{item.text.substring(0,250)}}...</nuxt-link>
                  </p>
                  <div class="other">
                    <div class="fl date">
                      <span>{{getDate(item.publishtime)}}</span>
                    </div>
                    <div class="fr remark">
                        <el-button @click="comment(item._id)" size="mini">评论</el-button>
                    </div>
                  </div>
                </div>
                <div class="clearfix"></div>
              </li>
            </ul>
            <div class="modal fade" id="remarkModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                      aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">发表评论</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fl right-tag">
        <div class="block-btn">
          <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p>
          <nuxt-link to="/spit/submit" class="sui-btn btn-block btn-share">发表吐槽</nuxt-link>
        </div>
      </div>
      <div class="content-item">
        <div class="tit">
          <span>分享扩散</span>
        </div>
        <div class="social-share" data-sites="qq,qzone,weibo,wechat">
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
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
  import '~/assets/css/page-sj-spit-index.css'
  import spitApi from '@/api/spit'
  import {getUser} from "@/utils/auth"
  import {formatDate, getDateDiff} from '@/utils/formatdate'

  export default {
    asyncData() {
      return spitApi.search(1, 10, {state: '1'}).then(res => {
        let tmp=res.data.data.rows.map(item=>{
          return {
            ...item,
            zan:''
          }
        })
        return {items: tmp}
      })
    },
    data() {
      return {
        pageNo: 1,
        reply:{
          _id:'',
          spitid:'',
          content:'',
          createtime:'',
          userid:'',
          nickname:''
        },
        dialogVisible: false,
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic'],
            ]
          }
        }
      }
    },
    methods: {
      loadMore() {
        this.pageNo++
        spitApi.search(this.pageNo, 10, {state: '1'}).then(res => {
          let tmp=res.data.data.rows.map(item=>{
            return {
              ...item,
              zan:''
            }
          })
          this.items=this.items.concat(tmp)
        })
      },
      thumbup(index) {
        if (getUser().name===undefined){
          this.$message({
            message:'必须登录后才能点赞哦~',
            type:'warning'
          })
          return
        }
        if (this.items[index].zan==='color'){
          this.$message({
            message:'不能重复点赞哦~',
            type:'warning'
          })
          return
        }
        this.items[index].zan='color'
        spitApi.thumbup(this.items[index]._id).then(res => {
          this.$message({
            message: res.data.message,
            type: (res.data.flag ? 'success' : 'error')
          })
          if (res.data.flag) {
            this.items[index].thumbup++
          }
        })
      },
      getDate(date){
        return formatDate(date)
      },
      comment(id){
        this.dialogVisible=true
        this.reply.spitid=id
        this.reply.content=''
        console.log(this.reply.spitid)
      },
      onEditorChange({editor, html, text}) {
        this.reply.content = html
      },
      savecomment() {
        this.reply.nickname=getUser().name
        spitApi.savecomment(this.reply).then(res => {
          this.$message({
            message: res.data.message,
            type: (res.data.flag ? 'success' : 'error')
          })
          if (res.data.flag) {
            this.dialogVisible=false
          }
        })
      },
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
