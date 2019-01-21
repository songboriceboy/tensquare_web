<template>
  <div>
    <div class="wrapper activities">
      <h1>{{item.name}}</h1>
      <div class="img-text">
        <div class="left-img">
          <img :src="item.image" alt=""/>
        </div>
        <div class="right-txt">
          <p>开始时间： {{item.starttime}}</p>
          <p>结束时间： {{item.endtime}}</p>
          <p>举办地点： {{item.address}}</p>
          <p>主办方：{{item.sponsor}}</p>
          <p>报名截止： {{item.enrolltime}}</p>
          <div class="join">
            <button class="sui-btn btn-danger">立即报名</button>
            <span class="will">报名即将开始</span>
          </div>
        </div>
      </div>
      <div class="simple-text">
        <div class="left-content">
          <div class="content-item">
            <div class="tit">
              <span>大会介绍</span>
            </div>
            <div class="text">
              <h4></h4>
              <p>{{item.summary}}</p>
            </div>
          </div>
          <div class="content-item">
            <div class="tit">
              <span>议题简介</span>
            </div>
            <div class="text">
              <h4></h4>
              <p>{{item.detail}}</p>
              <p>随着各国放宽金融法规，在 FinTech 创新上，尤其区块链领域正受到前所未有的支持，目前区块链技术有哪些最佳实践？如何替企业降低成本？金融新技术还有哪些玩法？我们将邀请研究 FinTech
                的技术专家，一起看金融技术在这阶段的深度实践。</p>
            </div>
          </div>
        </div>
        <div class="right-intro">
          <div class="content-item">
            <div class="tit">
              <span>活动组织者</span>
            </div>
            <div class="text">
              <p>主办方： {{item.sponsor}}</p>
            </div>
          </div>
          <div class="content-item">
            <div class="tit">
              <span>相关链接</span>
            </div>
            <div class="text">
              <p>活动官网： infoQ.com</p>
            </div>
          </div>
          <div class="content-item">
            <div class="tit">
              <span>分享扩散</span>
            </div>
            <div class="social-share" data-sites="qq,qzone,weibo,wechat">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import gatheringAPi from '@/api/gathering'
  import '~/assets/css/page-sj-activity-detail.css'

  export default {
    asyncData({params}) {
      return gatheringAPi.findById(params.id).then(res => {
        return {item: res.data.data}
      })
    },
    head: {
      script:[
        {src:'https://cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js'}
      ],
      link:[
        {rel:'stylesheet',href:'https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css'}
      ]
    }
  }
</script>
