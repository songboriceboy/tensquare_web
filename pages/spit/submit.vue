<template>
  <!--两列布局-->
  <div class="wrapper release-tc">
    <div class="release-box">
      <h3>发布吐槽</h3>
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
  import {quillRedefine} from 'vue-quill-editor-upload'
  import '~/assets/css/page-sj-spit-submit.css'
  import spitApi from '@/api/spit'
  import {getUser} from '@/utils/auth'

  export default {
    data() {
      return {
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
        pojo:{
          content: '',
        }
      }
    },
    mounted() {
      console.log('app init, my quill insrance object is:', this.myQuillEditor)
      /*setTimeout(() => {
        this.content = 'i am changed'
      }, 3000)*/
    },
    created() {
      // this.editorOption = quillRedefine(
      //   {
      //     //图片上传
      //     uploadConfig:{
      //       action:'http://localhost:3000/upload',// 必填参数 图片上传地址
      //       // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
      //       // 你必须把返回的数据中所包含的图片地址 return 回去
      //       res:(res)=>{
      //         return res.info
      //       },
      //       name:'img'//图片上传参数名
      //     }
      //   }
      // )
    },
    methods: {
      onEditorChange({editor, html, text}) {//内容改变事件
        console.log('editor change!', editor, html, text)
        this.pojo.content = html
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
        spitApi.save(pojo).then(res => {
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
