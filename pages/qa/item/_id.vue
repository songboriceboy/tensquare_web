<template>
  <div class="wrapper qa-content">

    <div class="qa-title">
      <div class="fl title">
        <h2>PHP进阶的有关问题</h2>
        <p>
          <span class="tag">PHPPP</span>
          <span class="author">PHP大牛</span>
          <span>2小时前提问 · 30分钟前更新</span>
        </p>
      </div>
      <div class="fr share">
        <h4>分享到：</h4>
        <ul class="share-go">
          <li><img src="~/assets/img/widget-weibo.png" alt=""></li>
          <li><img src="~/assets/img/widget-weixin.png" alt=""></li>
          <li><img src="~/assets/img/widget-weibo.png" alt=""></li>
          <li><img src="~/assets/img/widget-weixin.png" alt=""></li>
        </ul>

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
              <p>比如，我有一个表单页，需要填tit,tel以及上传的文件</p>
              <pre><code>&lt;div class="box"&gt;
    &lt;input type="text" value="标题" name="tit" class="tit"&gt;
    &lt;input type="text" value="联系方式" name="tel" class="tel"&gt;
    &lt;input type="file" multiple="multiple" value="" name="file" class="file"&gt;
    &lt;div class="sub-btn"&gt;提交&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
var tit=document.querySelector(".tit").value,
    tel=tit=document.querySelector(".tit").value,
    file=document.querySelector(".file"),
    btn=document.querySelector(".sub-btn"),
    xhr=new XMLHttpRequest(),
    data={
        tit:tit,
        tel:tel,
        file:null
    },
    _file=new FormData()
    ;
 btn.onclick=function(){
     //先测试1个文件;
     file.files[0].formEnctype = "multipart/form-data";
     _file.append("file", file.files[0]);
     data.file=_file;
     xhr.open("post","http://10.10.1.110/getInfo.do");
     xhr.send(data);//----A处
 }
&lt;/script&gt;
</code></pre>
              <p>在chrome network中看request playload 中显示的是 [object object],并不是</p>
              <pre><code>------WebKitFormBoundaryBcQMnHoeJT0GafEe
Content-Disposition: form-data; name="file"; filename="xxx.zip"
Content-Type: application/octet-stream
------WebKitFormBoundaryBcQMnHoeJT0GafEe--
            </code></pre>
              <p>这类信息。</p>
              <p>是上传文件必须和传递其他文本数据分开吗，还是我的方法使用错误？</p>
            </div>
            <div class="clearfix"></div>
            <div class="operate">
              <span class="time">1小时前提问</span>
              <span class="comment">评论</span>
              <span class="edit">编辑</span>
              <span class="jubao">举报</span>
            </div>
            <div class="comment-box">
              <form class="comment-form">
                <textarea row="1" placeholder="使用评论询问更多信息或提出修改意见，请不要在评论里回答问题"></textarea>
                <button type="submit" class="sui-btn submit-comment">提交评论</button>
              </form>
              <div class="tips">
                <p>评论支持部分 Markdown 语法：**bold**_italic_[link](http://example.com)> 引用`code`- 列表。 同时，被你 @ 的用户也会收到通知</p>
              </div>
            </div>

          </div>

        </div>
        <div class="answer-intro">
          <h4 class="answer-num">1个回答</h4>

          <div class="sidebar">
            <button type="button" class="like" data-placement="right" data-toggle="tooltip"
                    title="问题对人有帮助，内容完整，我也想知道答案"><i class="fa fa-caret-up" aria-hidden="true"></i></button>
            <span class="count">0</span>
            <button type="button" class="hate" data-placement="right" data-toggle="tooltip"
                    title="问题没有实际价值，缺少关键内容，没有改进余地"><i class="fa fa-caret-down" aria-hidden="true"></i></button>
          </div>
          <div class="title">
            <p>不需要分开传的 你看到的是由于你使用了 new FormData()</p>
            <div class="operate">
              <div class="tool pull-left">
                <span class="time">1小时前提问</span>
                <span class="comment">评论</span>
                <span class="edit">编辑</span>
                <span class="jubao">举报</span>
              </div>

              <div class="myanswer pull-right">
                <img src="~/assets/img/widget-photo.jpg" alt=""> <a href="#">我的回答</a>
              </div>
              <div class="clearfix"></div>
            </div>
            <div class="comment-box">
              <form class="comment-form">
                <textarea row="1" placeholder="使用评论询问更多信息或提出修改意见，请不要在评论里回答问题"></textarea>
                <button type="submit" class="sui-btn submit-comment">提交评论</button>
              </form>
              <div class="tips">
                <p>评论支持部分 Markdown 语法：**bold**_italic_[link](http://example.com)> 引用`code`- 列表。 同时，被你 @ 的用户也会收到通知</p>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="edit-answer">
          <h4>撰写答案</h4>
          <div class="edit-tip">
            <h4>你正在撰写答案</h4>
            <p>如果你是要对问题或其他回答进行点评或询问，请使用“评论”功能。</p>
          </div>
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
  export default {
    name: "_id"
  }
</script>

<style scoped>

</style>
