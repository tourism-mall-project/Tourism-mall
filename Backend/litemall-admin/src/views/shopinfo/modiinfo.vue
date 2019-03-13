/* eslint disable */
<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="店铺名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="logo">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="行业">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="负责人名字">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="客服电话">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="门店介绍">
        <el-input v-model="form.desc" type="textarea"/>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="店内设施">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"/>
          <el-checkbox label="地推活动" name="type"/>
          <el-checkbox label="线下主题活动" name="type"/>
          <el-checkbox label="单纯品牌曝光" name="type"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业执照">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="门头图片">
        <el-upload
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          <img src="" alt="">
        </el-upload>
      </el-form-item>

      <!--  <el-form-item label="货品图片" prop="url">
		  <el-upload
			:headers="headers"
			:action=""
			:show-file-list="false"
			:on-success=""
			:limit="1"
			class="avatar-uploader"
			accept=".jpg,.jpeg,.png,.gif">
			<img v-if="fileList[0].url" :src="fileList[0].url" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"/>
		  </el-upload>
	  </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'modiinfo',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
		  fileList: [
			  { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
			  { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
	   handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style lang="scss" >
.el-form{
	width: 500px;
}
.el-form .el-form-item__label:before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
}
</style>
