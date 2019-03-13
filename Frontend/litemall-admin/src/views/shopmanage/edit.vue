/* eslint-disable */
<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>商家编辑</h3>
      <el-form :model="shop" label-width="150px">
        <el-form-item label="行业分类" prop="industryClassify">
      		<el-checkbox-group v-model="checkindust">
      			<el-checkbox :label="1" >123</el-checkbox>
      			<el-checkbox :label="2" >213</el-checkbox>
      			<el-checkbox :label="3" >12qwe3</el-checkbox>
      		</el-checkbox-group>
        </el-form-item>
        <el-form-item label="所属区域" prop="region">
          <el-input v-model="shop.region"/>
        </el-form-item>
      	<el-form-item label="店内设施" prop="shopFacility">
      			<el-checkbox-group v-model="checklist">
      				<el-checkbox :label="1" >123</el-checkbox>
      				<el-checkbox :label="2" >213</el-checkbox>
      				<el-checkbox :label="3" >12qwe3</el-checkbox>
      			</el-checkbox-group>
      	</el-form-item>
      	<el-form-item label="详细地址" prop="address">
      	  <el-input v-model="shop.address"/>
      	</el-form-item>
      	<el-form-item label="logo" prop="url">
      	  <el-input v-model="shop.url"/>
      	</el-form-item>
      	<el-form-item label="店铺名称" prop="shopname">
      	  <el-input v-model="shop.shopname"/>
      	</el-form-item>
      	<el-form-item label="负责人名字" prop="username">
      	  <el-input v-model="shop.username"/>
      	</el-form-item>
      	<el-form-item label="门店介绍" prop="shopIntroduce">
      	  <el-input v-model="shop.shopIntroduce"/>
      	</el-form-item>
      	<el-form-item label="客服电话" prop="serviceMobile">
      	  <el-input v-model="shop.serviceMobile"/>
      	</el-form-item>
      	<el-form-item label="营业时间" prop="workTime">
      	  <el-input v-model="shop.workTime"/>
      	</el-form-item>
      	<el-form-item label="营业执照" prop="workimgUrl">
      	  <el-input v-model="shop.workimgUrl"/>
      	</el-form-item>
      	<el-form-item label="门头图片" prop="storefrontimgUrl">
      	  <el-input v-model="shop.storefrontimgUrl"/>
      	</el-form-item>
      	<el-form-item label="密码" prop="password">
      	  <el-input v-model="shop.password"/>
      	</el-form-item>
      	<el-form-item label="头像" prop="avatar">
      	  <el-input v-model="shop.avatar"/>
      	</el-form-item>
      </el-form>
			<div class="op-container">
			  <el-button @click="handleCancel">取消</el-button>
			  <el-button type="primary" @click="handleEdit">保存</el-button>
			</div>
			
    </el-card>
		
    

  </div>
</template>

<script>
import { detailshop, editshop } from '@/api/shop'
import { createStorage, uploadPath } from '@/api/storage'
import Editor from '@tinymce/tinymce-vue'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

export default {
  name: 'shopsEdit',
  data() {
    return {
      shop:{},
      checklist:[1],
      checkindust:[0]
      }
  },
  computed: {
    headers() {
      return {
        'X-Litemall-Admin-Token': getToken()
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init: function() {
      if (this.$route.query.id == null) {
        return
      }
      const shopid = this.$route.query.id
      detailshop(shopid).then(response => {
        this.shop = response.data.data
      })
    },
    handleCancel: function() {
      this.$router.push({ path: '/shopmanage/shoplist' })
    },
    handleEdit: function() {
      const allshop = this.shop
			console.log(allshop)
      editshop(allshop)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '创建成功'
          })
          this.$router.push({ path: '/shopmanage/shoplist' })
        })
        .catch(response => {
          MessageBox.alert('业务错误：' + response.data, '警告', {
            confirmButtonText: '确定',
            type: 'error'
          })
        })
    },
    handleClose(tag) {
      this.keywords.splice(this.keywords.indexOf(tag), 1)
      this.goods.keywords = this.keywords.toString()
    },
    uploadPicUrl: function(response) {
      this.goods.picUrl = response.data.url
    },
    uploadOverrun: function() {
      this.$message({
        type: 'error',
        message: '上传文件个数超出限制!最多上传5张图片!'
      })
    },
    handleGalleryUrl(response, file, fileList) {
      if (response.errno === 0) {
        this.goods.gallery.push(response.data.url)
      }
    },
    handleRemove: function(file, fileList) {
      for (var i = 0; i < this.goods.gallery.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url
        if (file.response === undefined) {
          url = file.url
        } else {
          url = file.response.data.url
        }

        if (this.goods.gallery[i] === url) {
          this.goods.gallery.splice(i, 1)
        }
      }
    },
    specChanged: function(label) {
      if (label === false) {
        this.specifications = [
          { specification: '规格', value: '标准', picUrl: '' }
        ]
        this.products = [
          { id: 0, specifications: ['标准'], price: 0.0, number: 0, url: '' }
        ]
      } else {
        this.specifications = []
        this.products = []
      }
    },
    uploadSpecPicUrl: function(response) {
      this.specForm.picUrl = response.data.url
    },
  }
}
</script>
