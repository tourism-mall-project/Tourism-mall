/*eslint disable*/
<template>
  <div class="app-container">
    <el-card class="box-card">
      <h3>商家添加</h3>
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
    </el-card>
    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlecreatshop">创建商家</el-button>
    </div>

  </div>
</template>

<script>
import { creatshop, listCatAndBrand } from '@/api/shop'
import { createStorage, uploadPath } from '@/api/storage'
import Editor from '@tinymce/tinymce-vue'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import axios from 'axios';
export default {
  name: 'createshop',
  data() {
    return {
			shop:{},
			checklist:[1],
			checkindust:[0]
    }
  },
  created() {
    this.init()
  },

  methods: {
    init: function() {
      listCatAndBrand().then(response => {
        this.categoryId = response.data.data.categoryList
        this.brandList = response.data.data.brandList
      })
    },
    handleCancel: function() {
      this.$router.push({ path: '/goods/goods' })
    },
    handlecreatshop: function() {
			this.shop.shopFacilityt = this.checklist
			this.shop.industryClassify = this.checkindust
			console.log(this.shopFacilityt )
      const allshop = this.shop;
			console.log(allshop)
      creatshop(allshop).then(response => {
        this.$notify.success({
          title: '成功',
          message: '创建成功'
        })
				this.$router.push({ path: 'shopmanage/shoplist' })
			
      }).catch(response => {
        MessageBox.alert('业务错误：' + response, '警告', {
          confirmButtonText: '确定',
          type: 'error'
        })
      })
    },
    handleClose(tag) {
      this.keywords.splice(this.keywords.indexOf(tag), 1)
      this.goods.keywords = this.keywords.toString()
    }
	}
}
</script>
