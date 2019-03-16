/* eslint-disable */
<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>商家编辑</h3>
      <el-form :model="shop" label-width="150px">
        <!-- <el-form-item label="行业分类" prop="industryClassify">
      		<el-checkbox-group v-model="checkindust">
      			<el-checkbox :label="1" >123</el-checkbox>
      			<el-checkbox :label="2" >213</el-checkbox>
      			<el-checkbox :label="3" >12qwe3</el-checkbox>
      		</el-checkbox-group>
        </el-form-item> -->
				<el-form-item label="行业分类">
				  <el-cascader :options="industryClassify" expand-trigger="hover" v-model="categoryIds" @change="handleCategoryChange"
					placeholder="请选择行业类别"/>
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
				<el-form-item label="logo">
				  <el-upload
				    :headers="headers"
				    :action="uploadPath"
				    :show-file-list="false"
				    :on-success="uploadPicUrla"
				    class="avatar-uploader"
				    accept=".jpg,.jpeg,.png,.gif">
				    <img v-if="shop.url" :src="shop.url" class="avatar">
				    <i v-else class="el-icon-plus avatar-uploader-icon"/>
				  </el-upload>
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
				<el-form-item label="营业执照">
				  <el-upload
				    :headers="headers"
				    :action="uploadPath"
				    :show-file-list="false"
				    :on-success="uploadPicUrlb"
				    class="avatar-uploader"
				    accept=".jpg,.jpeg,.png,.gif">
				    <img v-if="shop.workimgUrl" :src="shop.workimgUrl" class="avatar">
				    <i v-else class="el-icon-plus avatar-uploader-icon"/>
				  </el-upload>
				</el-form-item>
				<el-form-item label="门头图片">
				  <el-upload
				    :headers="headers"
				    :action="uploadPath"
				    :show-file-list="false"
				    :on-success="uploadPicUrlc"
				    class="avatar-uploader"
				    accept=".jpg,.jpeg,.png,.gif">
				    <img v-if="shop.storefrontimgUrl" :src="shop.storefrontimgUrl" class="avatar">
				    <i v-else class="el-icon-plus avatar-uploader-icon"/>
				  </el-upload>
				</el-form-item>
      	<el-form-item label="密码" prop="password">
      	  <el-input v-model="shop.password" placeholder="请输入密码至少6位数"/>
      	</el-form-item>
				<el-form-item label="头像">
				  <el-upload
				    :headers="headers"
				    :action="uploadPath"
				    :show-file-list="false"
				    :on-success="uploadPicUrld"
				    class="avatar-uploader"
				    accept=".jpg,.jpeg,.png,.gif">
				    <img v-if="shop.avatar" :src="shop.avatar" class="avatar">
				    <i v-else class="el-icon-plus avatar-uploader-icon"/>
				  </el-upload>
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
			uploadPath,
      shop:{},
      checklist:[],
      checkindust:[],
			categoryIds: [],
			industryClassify:[
				{
					value:'0',label: '生活服务',
					children: [
						{value: '0',label: '旅行社'},{value: '1',label: '培训'},{value: '2',label: '宠物'},{value: '3',label: '齿科'},
						{value: '4',label: '快照'},{value: '5',label: '冲印'},{value: '6',label: '家政'},{value: '7',label: '婚纱摄影'},
						{value: '8',label: '婚庆服务'},{value: '9',label: '儿童摄影'},{value: '10',label: '汽车服务'},{value: '11',label: '丽人'},
						{value: '12',label: '更多生活服务'}
					],
				},
				{
					value:'1',label: '购物',
					children: [
						{value: '0',label: '综合商场'},{value: '1',label: '食品茶酒'},{value: '2',label: '服饰鞋包'},{value: '3',label: '珠宝饰品'},
						{value: '4',label: '化妆品'},{value: '5',label: '运动户外'},{value: '6',label: '母婴儿童'},{value: '7',label: '数码家电'},
						{value: '8',label: '家具家居'},{value: '9',label: '书店'},{value: '10',label: '眼镜店'},{value: '11',label: '药店'},
						{value: '12',label: '超市'},{value: '13',label: '便利店'},{value: '14',label: '其他'}
					],
				},
				{
					value:'2',label: '运动健身',
					children: [
						{value: '0',label: '健身中心'},{value: '1',label: '游泳馆'},{value: '2',label: '羽毛球馆'},{value: '3',label: '瑜伽'},
						{value: '4',label: '舞蹈'},{value: '5',label: '篮球场'},{value: '6',label: '网球场'},{value: '7',label: '足球场'},
						{value: '8',label: '高尔夫场'},{value: '9',label: '保龄球馆'},{value: '10',label: '乒乓球馆'},{value: '11',label: '体育场馆'},
						{value: '12',label: '更多运动场馆'}
					],
				},
				{
					value:'3',label: '餐饮美食',
					children: [
						{value: '0',label: '川菜'},{value: '1',label: '粤菜'},{value: '2',label: '茶馆'},{value: '3',label: '火锅'},
						{value: '4',label: '烧烤'},{value: '5',label: '海鲜'},{value: '6',label: '特色小吃'},{value: '7',label: '日韩料理'},
						{value: '8',label: '西餐'},{value: '9',label: '自助餐'},{value: '10',label: '东南亚菜'},{value: '11',label: '面包甜点'},
						{value: '12',label: '其他'}
					],
				},
				{
					value:'4',label: '休闲娱乐',
					children: [
						{value: '0',label: '咖啡厅'},{value: '1',label: '酒吧'},{value: '2',label: '茶馆'},{value: '3',label: 'KTV'},
						{value: '4',label: '电影院'},{value: '5',label: '文化艺术'},{value: '6',label: '景点、郊游'},{value: '7',label: '公园'},
						{value: '8',label: '足疗按摩'},{value: '9',label: '洗浴'},{value: '10',label: '游乐游艺'},{value: '11',label: '台球馆'},
						{value: '12',label: '桌面游戏'},{value: '13',label: '更多休闲娱乐'}
					],
				}
			],
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
				this.categoryIds= response.data.data.industryClassify
				console.log(this.categoryIds)
				console.log(this.industryClassify[this.categoryIds[0]].label)
				console.log(this.industryClassify[this.categoryIds[0]].children[0].label)
				
				// console.log(this.shop)
      })
    },
    handleCancel: function() {
      this.$router.push({ path: '/shopmanage/shoplist' })
    },
    handleEdit: function() {
      const allshop = this.shop
			// console.log(allshop)
      editshop(allshop).then(response => {
          this.$notify.success({
            title: '成功',
            message: '创建成功'
          })
          // this.$router.push({ path: '/shopmanage/shoplist' })
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
		//上传图片
    uploadPicUrla: function(response) {
       this.shop.url = 'http://120.79.250.63:'+response.data.url.split(':')[2]
    },
		uploadPicUrlb: function(response) {
		   this.shop.workimgUrl = 'http://120.79.250.63:'+response.data.url.split(':')[2]
		},
		uploadPicUrlc: function(response) {
		   this.shop.storefrontimgUrl = 'http://120.79.250.63:'+response.data.url.split(':')[2]
		},
		uploadPicUrld: function(response) {
		   this.shop.avatar = 'http://120.79.250.63:'+response.data.url.split(':')[2]
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
		handleCategoryChange () {
			
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

<style scoped="scoped">
	.avatar{
		display: block;
		width: 150px;
		height: 150px;
		object-fit: contain;
		border: 1px dashed #dcdfe6;
    border-radius: 8px;
    outline: none;
	}
</style>
