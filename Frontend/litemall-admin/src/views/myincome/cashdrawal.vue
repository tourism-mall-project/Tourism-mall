<template>
  <div class="app-container">
  	<el-card class="box-card">
      <h3>提现详情</h3>
      <el-form ref="goods" :rules="rules" :model="goods" label-width="150px">
        <el-form-item label="*提现金额" prop="">
          <el-input />
        </el-form-item>
        
        <el-form-item label="提现到" prop="isNew">
          <el-radio-group v-model="goods.isNew">
            <el-radio :label="1">支付宝</el-radio>
            <el-radio :label="2">微信</el-radio>
            <el-radio :label="3">银行卡</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-row class="showcashto" >
		  <el-col :span="8" v-show="showz">
		    <el-card>
		      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552047739654&di=ce244ed079458a3e0f3c0f55509d1a8b&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F00%2F59%2F84%2F585a6889d94d5_610.jpg" 
		      	class="image">
		      <div style="padding: 14px;">
		        <span>好吃的汉堡</span>
		      </div>
		    </el-card>
		  </el-col>
		  <el-col :span="8" v-show="showw">
		    <el-card>
		      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552047739654&di=ce244ed079458a3e0f3c0f55509d1a8b&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F00%2F59%2F84%2F585a6889d94d5_610.jpg" 
		      	class="image">
		      <div style="padding: 14px;">
		        <span>好吃的汉堡</span>
		      </div>
		    </el-card>
		  </el-col>
		  <el-col :span="8" v-show="showy">
		    <el-card>
		      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552047739654&di=ce244ed079458a3e0f3c0f55509d1a8b&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F00%2F59%2F84%2F585a6889d94d5_610.jpg" 
		      	class="image">
		      <div style="padding: 14px;">
		        <span>好吃的汉堡</span>
		      </div>
		    </el-card>
		  </el-col>
		</el-row>
        
      </el-form>
      
      <div class="op-container">
	    <!--<el-button @click="handleCancel">取消</el-button>-->
	    <el-button type="primary" @click="handleCash">提现</el-button>
	  </div>
        
    </el-card>
  </div>
</template>

<style scoped>
.showcashto .el-col{
	width: 200px;
	height: 250px;
	margin: 0 auto;
	padding: 20px;
	overflow: hidden;
}
.showcashto .el-col img{
	width: 100%;
	height: 100%;
}
.showcashto  .el-card{
	box-shadow: none;
}
</style>

<script>
export default {
  name: 'cashdrawal',
  data() {
    return {
    	goods: { picUrl: '', gallery: [] },
    	rules: {
	        goodsSn: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
	        name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }]
	    },
	    showy:false
    }
  },
  computed: {

  },
  created() {
 
  },
  methods: {
  	handleCash(){
  		
  	}
  }
}
</script>
