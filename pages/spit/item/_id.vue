<template>
  <div class="wrapper tc-detail">
    <div class="fl left-list">
      <div class="tc-detail">
        <!-- 标题区 -->
        <div class="detail-tit">
          <div class="detail-author">
            <a href="javascript:;">{{pojo.nikename}}</a> 发布
          </div>
          <div class="detail-content">
            <p>{{pojo.content}}</p>
            <img src="~/assets/img/widget-tc-detail.png" alt=""/>
          </div>
          <div class="detail-tool">
            <ul>
              <li><span class="star"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>{{pojo.thumbup}}</span></li>
              <li><a href="#" data-toggle="modal" data-target="#shareModal"><i class="fa fa-share-alt"
                                                                               aria-hidden="true"></i>{{pojo.share}}</a>
              </li>
              <li><a data-toggle="modal" data-target="#remarkModal"><i class="fa fa-commenting"
                                                                       aria-hidden="true"></i> {{pojo.comment}}</a></li>
            </ul>
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
                <p class="author"><a href="javascript:;">{{item.nikename}}</a> 发布{{item.publishtime}}</p>
                <p class="content">{{item.content}}</p>
              </div>
              <div class="item-thumb">
                <div>
                  <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> {{item.thumbup}}
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
        <a class="sui-btn btn-block btn-share" href="./spit-submit.html" target="_blank">发吐槽</a>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import '~/assets/css/page-sj-spit-detail.css'
  import spitApi from '@/api/spit'
  import axios from 'axios'

  export default {
    asyncData({params}) {
      return axios.all([spitApi.findById(params.id), spitApi.commentlist(params.id)]).then(
        axios.spread(function (pojo, commentlist) {
          return {
            pojo: pojo.data.data,
            commentlist: commentlist.data.data
          }
        })
      )
    }
  }
</script>
