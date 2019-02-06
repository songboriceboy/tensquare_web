<template>
  <div class="wrapper release-tc">
    <div class="release-box">
      <h3>发布问题</h3>
      <div class="editor">
        <div class="quill-editor"
             :content="content"
             @change="onEditorChange($event)"
             @blur="onEditorBlur($event)"
             @focus="onEditorFocus($event)"
             @ready="onEditorReady($event)"
             v-quill:myQuillEditor="editorOption">
        </div>
      </div>
      <div class="btn">
        <button class="sui-btn btn-danger btn-release" @click="save">发布</button>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import '~/assets/css/page-sj-qa-submit.css'
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
        this.pojo.text=text
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
