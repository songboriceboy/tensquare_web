<template>
  <div class="qa-submit-form">
    <form action="" class="sui-form">
      <div class="input-title">
        <input type="text" placeholder="标题：一句话说清问题，用问号结尾" class="input-xfat input-xxlarge title">
      </div>
      <div class="tags-area">
        <div class="input-tags">
          <input type="text" placeholder="标签，如:php可使用逗号，分号； 来分隔" class="input-xfat input-xxlarge" id="tags">
        </div>
        <div class="tags-box">
          <ul class="sui-tag tag-bordered">
            <li class="tag-item">javascript</li>
            <li class="tag-item">php</li>
            <li class="tag-item">css</li>
            <li class="tag-item">html</li>
            <li class="tag-item">java</li>
            <li class="tag-item">python</li>
            <li class="tag-item">html5</li>
            <li class="tag-item">node.js</li>
            <li class="tag-item">c++</li>
          </ul>
        </div>
      </div>

      <div class="editor">

        <textarea name="editor1"></textarea>
      </div>
      <div class="submit">
        <span>已保存草稿</span>
        <span><a class="sui-btn btn-release">发布问题</a></span>
      </div>
      <div class="clearfix"></div>
    </form>
  </div>
</template>
<!--<div class="editor">-->
<!--<div class="quill-editor"-->
<!--:content="content"-->
<!--@change="onEditorChange($event)"-->
<!--@blur="onEditorBlur($event)"-->
<!--@focus="onEditorFocus($event)"-->
<!--@ready="onEditorReady($event)"-->
<!--v-quill:myQuillEditor="editorOption">-->
<!--</div>-->
<!--</div>-->
<script>
  import '~/assets/css/page-sj-qa-submit.css'
  import '~/assets/css/page-sj-qa-logined.css'
  import problemApi from '@/api/problem'

  export default {
    data() {
      return {
        pojo: {
          content: '',
          text: '',
        },
        editorOption: {
          // 富文本中的一些属性
          // modules: {
          //   toolbar: [
          //     [{'size': ['small', false, 'large']}],
          //     ['bold', 'italic'],
          //     [{'list': 'ordered'}, {'list': 'bullet'}],
          //     ['link', 'image'],
          //     ['blockquote', 'code-block']
          //   ]
          // }
        }
      }
    },
    methods: {
      onEditorChange({editor, html, text}) {//内容改变事件
        this.pojo.content = html
        this.pojo.text = text
      },
      onEditorBlur(editor) {//失去焦点事件
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {//获得焦点事件
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {//准备编辑器
        console.log('editor ready!', editor)
      },
      save() {//提交
        console.log(this.pojo.text)
      }
    }
  }
</script>
