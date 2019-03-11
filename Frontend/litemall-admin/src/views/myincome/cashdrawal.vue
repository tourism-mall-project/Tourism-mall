/* eslint-disable */
alert('foo');
<template>
  <div class="app-container">
  	<el-card class="box-card" style=""><!--width: 80%;min-width: 436px;-->
      <h3>提现详情</h3>
      <el-form :rules="rules" :model="ruleForm" label-width="150px" ref="ruleForm">
        <el-form-item label="*提现金额" prop="money">
          <el-input v-model="ruleForm.money"/>
        </el-form-item>
        
        <el-form-item label="提现到" prop="platform"  class="showcashto">
			    <el-radio-group  v-model="ruleForm.platform" >
			      <el-radio :label="0">
			      	<img src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=2b7785ca3412b31bc76cca2fbe235147/9c16fdfaaf51f3deec75a0e999eef01f3b297973.jpg" 
				      		class="image">
				      <span class="plat-info">支付宝</span>
			      </el-radio>
			      <el-radio :label="1">
			      	<img src="https://img04.sogoucdn.com/app/a/100520093/68cbdd36628d4677-695e2f452898e907-12aa846dcd7a7f2b8a0c079aaa73f0f6.jpg"
					    			class="image"/>
					    <span class="plat-info">微信</span>
			      </el-radio>
			      <el-radio :label="2">
			      	<img src="https://i2.sinaimg.cn/dy/w/2014-11-18/1416273616_4XZebp.jpg"
					    			class="image"/>
					    <span class="plat-info">银联卡</span>
			      </el-radio>
			    </el-radio-group>
			  </el-form-item>
        
      </el-form>
      
      <div class="op-container">
	    <el-button @click="handleCancel">取消</el-button>
	    <el-button type="primary" @click="handleCash">提现</el-button>
	  </div>
        
    </el-card>
  </div>
</template>

<style>
.showcashto .el-card{
	box-shadow: none;
	height: 250px;
}
.showcashto img{
	width: 100px;
	height: auto;
	display: block;
	margin: 0 auto;
}
.showcashto .el-radio{
	display: inline-block;
	width: 200px;
	padding: 10px;
}
.showcashto .plat-info{
	display: block;
	text-align: center;
	line-height: 30px;
}



</style>

<script>
export default {
  name: 'cashdrawal',
  data() {
    return {
    	goods: { picUrl: '', gallery: [] },
    	rules: {
	        money: [{ required: true, message: '金额不能为空', trigger: 'blur' }]
	    },
	    activepay: 'first',
	    ruleForm: {
	    	money: '',
	    	isNew: '',
	    	platform: ''
	    },
	  }
  },
  computed: {

  },
  created() {
 
  },
  methods: {
  	handleCash(){
  		
  	},
  	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
  }
}
</script>
