<template>
  <div class="app-container">
  	<el-card class="box-card">
  		账户余额:<span class="mybalance">{{balance}}</span>元
  		<el-button type="primary" size="mini" style="margin-left:20px">充值</el-button>
  		<el-button type="danger" size="mini" @click="cash">提现</el-button>
  		
  	</el-card>
  </div>
</template>

<style scoped>
.mybalance{
	color: red;
	font-size: 27px;
	padding: 0 10px;
}
.el-card.is-always-shadow{
	box-shadow: none;	
}
</style>

<script>
export default {
  name: 'balance',
  data() {
    return {
    	balance: "100",
    	
    }
  },
  computed: {

  },
  created() {
 
  },
  methods: {
  	//提现跳转
  	cash() {
      this.$router.push({ path: '/myincome/cashdrawal' })
    },
  	
  }
}
</script>
