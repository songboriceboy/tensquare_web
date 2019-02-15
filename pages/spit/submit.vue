<template>
  <!--两列布局-->
  <div class="wrapper release-tc">
    <div class="release-box">
      <h3>发布吐槽</h3>
      <div class="editor">
        <div class="quill-editor"
             :content="pojo.content"
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
  import {quillRedefine} from 'vue-quill-editor-upload'
  import '~/assets/css/page-sj-spit-submit.css'
  import spitApi from '@/api/spit'
  import {getUser} from '@/utils/auth'

  export default {
    data() {
      return {
        pojo: {
          _id: '',
          content: '',
          publishtime: '',
          userid: '',
          nickname: '',
          visits: '',
          thumbup: '',
          share: '',
          comment: '',
          state: '',
          parentid: '',
          text: ''
        },
        editorOption: {
          // // some quill options
          // modules: {
          //   // toolbar: [
          //   //   [{'size': ['small', false, 'large']}],
          //   //   ['bold', 'italic'],
          //   //   [{'list': 'ordered'}, {'list': 'bullet'}],
          //   //   ['link', 'image'],
          //   //   ['blockquote', 'code-block']
          //   // ]
          // }
        },
      }
    },
    methods: {
      onEditorChange({editor, html, text}) {//内容改变事件
        console.log('editor change!', editor, html, text)
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
        this.pojo.nickname = getUser().name
        spitApi.save(this.pojo).then(res => {
          this.$message({
            message: res.data.message,
            type: (res.data.flag ? 'success' : 'error')
          })
          if (res.data.flag) {
            this.$router.push('/spit')
          }
        })
      }
    }
  }
</script>
<style>
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
</style>
