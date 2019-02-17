<template>
  <div>
    <header>
      <!--引用组件-->
      <div class="activity-head">
        <div class="wrapper">
          <!--头部导航-->
          <div class="sui-navbar">
            <div class="navbar-inner">
              <a href="/" class="sui-brand"><img src="~/assets/img/asset-logo-black.png" alt="社交"/></a>
              <ul class="sui-nav">
                <router-link to="/" tag="li" active-class="active" exact><a>头条</a></router-link>
                <router-link to="/qa" tag="li" active-class="active" exact><a>问答</a></router-link>
                <router-link to="/gathering" tag="li" active-class="active" exact><a>活动</a></router-link>
                <!--<router-link to="/friends" tag="li" active-class="active" exact><a>交友</a></router-link>-->
                <router-link to="/spit" tag="li" active-class="active" exact><a>吐槽</a></router-link>
                <router-link to="/recruit" tag="li" active-class="active" exact><a>招聘</a></router-link>
              </ul>
              <form class="sui-form sui-form pull-left">
                <input type="text" v-model="searchInfo" placeholder="输入关键词..."/>
                <span class="btn-search fa fa-search" @click="search"></span>
              </form>
              <div class="sui-nav pull-right info" v-if="user.name!==undefined">
                <li><a href="/manager" target="_blank" class="notice">{{user.name}}</a></li>
                <li><a href="/manager" class="homego"><img :src="user.avater" width="50px" height="50px" :alt="user.name"></a>
                </li>
                <li><a @click="loginOut" class="notice">退出登录</a></li>
              </div>
              <div class="sui-nav pull-right info" v-if="user.name===undefined">
                <router-link to="/login">登陆</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <nuxt/>
    <footer>
      <!--底部版权-->
      <div class="footer">
        <div class="wrapper">
          <div class="footer-bottom">
            <div class="link">
              <dl>
                <dt>
                  网站相关
                </dt>
                <dd>
                  关于我们
                </dd>
                <dd>
                  服务条款
                </dd>
                <dd>
                  帮助中心
                </dd>
                <dd>
                  编辑器语法
                </dd>
              </dl>
              <dl>
                <dt>
                  常用链接
                </dt>
                <dd>
                  兆隆教育
                </dd>
                <dd>
                  兆隆论坛
                </dd>
                <dd>
                  百度
                </dd>
              </dl>
              <dl>
                <dt>
                  联系我们
                </dt>
                <dd>
                  联系我们
                </dd>
                <dd>
                  加入我们
                </dd>
                <dd>
                  建议反馈
                </dd>
              </dl>
              <dl>
                <dt>
                  关注我们
                </dt>
                <dd>
                  微博
                </dd>
                <dd>
                  twitter
                </dd>
              </dl>
              <div class="xuke">
                <h3>内容许可</h3>
                <p>除特别说明外，用户内容均采用知识共享署名-非商业性使用-禁止演绎4.0 国际许可协议 (CC BY-NC-ND 4.0) 进行许可</p>
                <p>本站由 王明欢 提供更新服务</p>
              </div>
            </div>
            <p class="Copyright">Copyright &copy; 2018 兆隆问答社区 当前版本 0.0.1</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
  import '~/assets/plugins/normalize-css/normalize.css'
  import '~/assets/plugins/yui/cssgrids-min.css'
  import '~/assets/plugins/sui/sui.min.css'
  import '~/assets/plugins/sui/sui-append.min.css'
  import '~/assets/plugins/font-awesome/css/font-awesome.min.css'
  import '~/assets/css/widget-base.css'
  import '~/assets/css/widget-head-foot.css'
  import {getUser, rmUser} from '@/utils/auth'
  import {logout} from '@/api/login'

  export default {
    data() {
      return {
        user: {},
        searchInfo:''
      }
    },
    created() {
      this.user = getUser()
    },
    methods: {
      loginOut() {
        rmUser()//清楚用户信息
        location.href = '/'
      },
      search(){
        alert("这是搜索的信息："+this.searchInfo)
      }
    }
  }
</script>
