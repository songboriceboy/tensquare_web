<template>
  <div class="wrapper qa-content">
    <div class="fl left-list">
      <div class="tab-content">
        <div id="index" class="tab-pane active">
          <div class="tab-bottom-line">
            <ul class="sui-nav nav-tabs">
              <li :class="type=='new'?'active':''"><a @click="type='new'">最新回答</a></li>
              <li :class="type=='hot'?'active':''"><a @click="type='hot'">热门回答</a></li>
              <li :class="type=='wait'?'active':''"><a @click="type='wait'">等待回答</a></li>
            </ul>
            <div class="qa-list">
              <div class="tab-content">
                <div id="new" :class="'tab-pane '+(type=='new'?'active':'')" v-infinite-scroll="loadMore">
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
                              {{labelList}}
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
                <div id="hot" :class="'tab-pane '+(type=='hot'?'active':'')">
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
                            <li>
                              {{labelList}}
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
                <div id="wait" :class="'tab-pane '+(type=='wait'?'active':'')">
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
                            <li>
                              {{labelList}}
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
              </div>
            </div>
          </div>
        </div>
        <div id="php" class="tab-pane">
          php
        </div>
        <div id="js" class="tab-pane">
          Javascript
        </div>
        <div id="python" class="tab-pane">
          python
        </div>
        <div id="java" class="tab-pane">
          java
        </div>
      </div>
    </div>
    <div class="fl right-tag">
      <div class="block-btn">
        <p>今天，有什么好东西要和大家分享么?</p>
        <a class="sui-btn btn-block btn-share" target="_blank">
          <nuxt-link to="/qa/problem">发布问题</nuxt-link>
        </a>
      </div>
      <div class="hot-tags">
        <div class="head">
          <h3 class="title">热门标签</h3>
        </div>
        <div class="tags">
          <ul class="sui-tag">
            <li>Php</li>
            <li>Javascript</li>
            <li>Gif</li>
            <li>Java</li>
            <li>C#</li>
            <li>iOS</li>
            <li>C++</li>
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
    asyncData({params, error}) {
      return axios.all([problemApi.list('newlist', params.label, 1, 10),
        problemApi.list('hotlist', params.label, 1, 10),
        problemApi.list('waitlist', params.label, 1, 10)]).then(axios.spread(function (newlist, hotlist, waitlist) {
        return {
          newlist: newlist.data.data.rows,
          hotlist: hotlist.data.data.rows,
          waitlist: waitlist.data.data.rows,
          label: params.label
        }
      }))
    },
    data() {
      return {
        type: 'new',
        page_new: 1,//记录最新问题列表的页码
        page_hot: 1,//记录热门问题列表的页码
        page_wait: 1,//记录等待回答列表的页码
        proid: '',
        labelList: {}
      }
    },
    methods: {
      loadMore() {
        if (this.type === 'new') {
          this.page_new++
          problemApi.list('newlist', this.label, this.page_new, 10).then(res => {
            this.newlist = this.newlist.concat(res.data.data.rows)
          })
        }
        if (this.type === 'hot') {
          this.page_hot++
          problemApi.list('hotlist', this.label, this.page_hot, 10).then(res => {
            this.hotlist = this.hotlist.concat(res.data.data.rows)
          })
        }
        if (this.type === 'wait') {
          this.page_wait++
          console.log(this.label)
          problemApi.list('waitlist', this.label, this.page_wait, 10).then(res => {
            this.waitlist = this.waitlist.concat(res.data.data.rows)
          })
        }
      },
      dataFormate(date) {
        return formatDate(date)
      },
      getDate(date) {
        return getDateDiff(date)
      },
      //获得根据问题id查询标签的集合 值拿到了 不知道怎么处理
      getLabNameList(proId) {
        problemApi.getLabelList(proId).then(res1 => {
          labelApi.getLabNameListBy(res1.data.data).then(res2 => {
            this.labelList = res2.data.data
          })
        })
      }
    },
  }
</script>
