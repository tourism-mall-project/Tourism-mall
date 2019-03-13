/* eslint-disable */
<template>
  <div class="app-container">
  	<el-card class="box-card">
  		账户余额:<span class="mybalance">{{balance}}</span>元
  		<el-button type="primary" size="mini" style="margin-left:20px">充值</el-button>
  		<el-button type="danger" size="mini" @click="cash">提现</el-button>
  	</el-card>
  	
  	<h3 class="txtrem">日志:</h3>
  	<el-table v-loading="listLoading" :data="list" size="small" border fit highlight-current-row>
  		<el-table-column align="center" label="日期" prop="time"/>
  		<el-table-column align="center" label="订单编号" prop=""/>
      <el-table-column align="center" label="商品编号" prop="goodsSn"/>
      <el-table-column align="center" min-width="100" label="名称" prop="name"/>
      <el-table-column align="center" property="iconUrl" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" width="40">
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" prop="retailPrice"/>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <!--{{状态}}+{{金额}}-->
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  	
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
.txtrem{
	font-weight: bold;
	color: #909399;;
	font-size: 12px;
}
</style>

<script>
export default {
  name: 'balance',
  data() {
    return {
    	balance: "100",
    	listLoading: false,
    	list: [],
    	
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
