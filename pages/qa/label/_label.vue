<template>
  <div class="wrapper qa-content">
    <div class="fl left-list">
      <div class="tab-content">
        <div id="index" class="tab-pane active">
          <div class="tab-bottom-line">
            <ul class="sui-nav nav-tabs">
              <li :class="type='new'?'active':''"><a @click="type='new'">最新回答</a></li>
              <li :class="type='hot'?'active':''"><a @click="type='hot'">热门回答</a></li>
              <li :class="type='wait'?'active':''"><a @click="type='wait'">等待回答</a></li>
            </ul>
            <div class="qa-list">
              <div class="tab-content">
                <!--<div id="new" :class="'tab-pane '+(type='new'?'active':'')" v-infinite-scroll="loadMore">-->
                  <div id="new" :class="'tab-pane '+(type='new'?'active':'')">
                  <ul class="detail-list">
                    <li class="qa-item" v-for="(item,index) in newlist" :key="index">
                      <div class="fl record">
                        <div class="number">
                          <div class="border useful">
                            <p class="usenum">{{item.thumbup}}</p>
                            <p>有用</p>
                          </div>
                          <div class="border answer">
                            <p class="ansnum">{{item.reply}}</p>
                            <p>回答</p>
                          </div>
                        </div>
                      </div>
                      <div class="fl info">
                        <div class="question">
                          <p class="author"><span class="name">{{item.replyname}}</span><span>{{getDate(item.replytime)}}</span>回答
                          </p>
                          <p class="title">
                            <nuxt-link :to="'/qa/problem/'+item.id">{{item.title}}</nuxt-link>
                          </p>
                        </div>
                        <div class="other">
                          <ul class="fl sui-tag">
                            <li>
                              {{item.labels}}
                            </li>
                          </ul>
                          <div class="fr brower">
                            <p>浏览量 {{item.visits}} | {{dataFormate(item.createtime)}} 来自 <a
                              href="#">{{item.nickname}} </a></p>
                          </div>
                        </div>
                      </div>
                      <div class="clearfix"></div>
                    </li>
                  </ul>
                </div>
                <div id="hot" :class="'tab-pane '+(type='hot'?'active':'')">
                  <ul class="detail-list">
                    <li class="qa-item" v-for="(item,index) in hotlist" :key="index">
                      <div class="fl record">
                        <div class="number">
                          <div class="border useful">
                            <p class="usenum">{{item.thumbup}}</p>
                            <p>有用</p>
                          </div>
                          <div class="border answer">
                            <p class="ansnum">{{item.reply}}</p>
                            <p>回答</p>
                          </div>
                        </div>
                      </div>
                      <div class="fl info">
                        <div class="question">
                          <p class="author"><span class="name">{{item.replyname}}</span><span>{{getDate(item.replytime)}}</span>回答
                          </p>
                          <p class="title">
                            <nuxt-link :to="'/qa/problem/'+item.id">{{item.title}}</nuxt-link>
                          </p>
                        </div>
                        <div class="other">
                          <ul class="fl sui-tag">
                            <!--<li v-for="(item1,index1) in getLabNameList(item.id)" :key="index1">-->
                              <!--{{item1.labelname}}-->
                            <!--</li>-->
                          </ul>
                          <div class="fr brower">
                            <p>浏览量 {{item.visits}} | {{dataFormate(item.createtime)}} 来自 <a
                              href="#">{{item.nickname}} </a></p>
                          </div>
                        </div>
                      </div>
                      <div class="clearfix"></div>
                    </li>
                  </ul>
                </div>
                <div id="wait" :class="'tab-pane '+(type='wait'?'active':'')">
                  <ul class="detail-list">
                    <li class="qa-item" v-for="(item,index) in waitlist" :key="index">
                      <div class="fl record">
                        <div class="number">
                          <div class="border useful">
                            <p class="usenum">{{item.thumbup}}</p>
                            <p>有用</p>
                          </div>
                          <div class="border answer">
                            <p class="ansnum">{{item.reply}}</p>
                            <p>回答</p>
                          </div>
                        </div>
                      </div>
                      <div class="fl info">
                        <div class="question">
                          <p class="author"><span class="name">{{item.replyname}}</span><span>{{getDate(item.replytime)}}</span>回答
                          </p>
                          <p class="title">
                            <nuxt-link :to="'/qa/problem/'+item.id">{{item.title}}</nuxt-link>
                          </p>
                        </div>
                        <div class="other">
                          <ul class="fl sui-tag">
                            <!--<li v-for="(item1,index) in getLabNameList(item.id)" :key="index">-->
                              <!--{{item1[index]}}-->
                            <!--</li>-->
                          </ul>
                          <div class="fr brower">
                            <p>浏览量 {{item.visits}} | {{dataFormate(item.createtime)}} 来自 <a
                              href="#">{{item.nickname}} </a></p>
                          </div>
                        </div>
                      </div>
                      <div class="clearfix"></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fl right-tag">
      <div class="block-btn">
        <p>今天，有什么好东西要和大家分享么?</p>
        <a class="sui-btn btn-block btn-share" target="_blank">
          <nuxt-link to="/qa/submit">发布问题</nuxt-link>
        </a>
      </div>
      <div class="hot-tags">
        <div class="head">
          <h3 class="title">热门标签</h3>
        </div>
        <div class="tags">
          <ul class="sui-tag">
            <li v-for="(item,index) in labellist" :key="index">{{item.labelname}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import '~/assets/css/page-sj-qa-logined.css'
  import problemApi from "@/api/problem"
  import labelApi from "@/api/label"
  import axios from 'axios'
  import {formatDate, getDateDiff} from '@/utils/formatdate'

  export default {
    asyncData({params,error}) {
      return axios.all([problemApi.list('newlist', params.label, 1, 10),
        problemApi.list('hotlist', params.label, 1, 10),
        problemApi.list('waitlist', params.label, 1, 10),
        labelApi.getLabelList()]).then(axios.spread(function (newlist, hotlist, waitlist, labellist) {
          console.log(newlist)
        return {
          newlist: newlist.data.data.rows.map(item=>{
            return{
              ...item,
              labels:"显示不出来呀"
            }
          }),
          hotlist: hotlist.data.data.rows,
          waitlist: waitlist.data.data.rows,
          label: params.label,
          labellist:labellist.data.data
        }
      }))
    },
    data() {
      return {
        type: 'new',
        page_new: 1,//记录最新问题列表的页码
        page_hot: 1,//记录热门问题列表的页码
        page_wait: 1,//记录等待回答列表的页码
      }
    },
    methods: {
      // loadMore() {
      //   if (this.type === 'new') {
      //     this.page_new++
      //     problemApi.list('newlist', this.label, this.page_new, 10).then(res => {
      //       this.newlist = this.newlist.concat(res.data.data.rows)
      //     })
      //   }
      //   if (this.type === 'hot') {
      //     this.page_hot++
      //     problemApi.list('hotlist', this.label, this.page_hot, 10).then(res => {
      //       this.hotlist = this.hotlist.concat(res.data.data.rows)
      //     })
      //   }
      //   if (this.type === 'wait') {
      //     this.page_wait++
      //     problemApi.list('waitlist', this.label, this.page_wait, 10).then(res => {
      //       this.waitlist = this.waitlist.concat(res.data.data.rows)
      //     })
      //   }
      // },
      dataFormate(date) {
        return formatDate(date)
      },
      getDate(date) {
        return getDateDiff(date)
      },
      //获得根据问题id查询标签的集合 值拿到了 不知道怎么处理
      getLabNameList(proId,index) {
        problemApi.getLabelList(proId).then(res1 => {
          labelApi.getLabNameListBy(res1.data.data).then(res2 => {
            this.newlist[index].labels=res2.data.data
          })
        })
      }
    },
  }
</script>
