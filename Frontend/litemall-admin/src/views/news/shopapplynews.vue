/* eslint disable */
<template>
	<div class="app-container">
		
		<el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>
			
			<el-table-column align="center" label="id-int" prop="id"/>
			<el-table-column align="center" label="行业分类-string" prop="industryClassify"/>
			<el-table-column align="center" label="详细地址-string" prop="address"/>
			<el-table-column align="center" label="url-string" prop="url"/>
			<el-table-column align="center" label="店铺名称-string" prop="shopname"/>
			<el-table-column align="center" label="负责人名字-string" prop="username"/>
			<el-table-column align="center" label="门店介绍-stringt" prop="shopIntroduce"/>
			<el-table-column align="center" label="workimgUrl-string" prop="workimgUrl"/>
			<el-table-column align="center" label="avatar-string" prop="avatar"/>
			<el-table-column align="center" label="states-string" prop="states"/>
			<el-table-column align="center" label="remark-string" prop="remark"/>
			<el-table-column align="center" label="roleName-string" prop="roleName"/>
			<el-table-column label="操作">
				<el-button type="primary" size="mini" @click="handleUpdate(scope.row)">审核</el-button>
			</el-table-column>
			
		</el-table>
	</div> 
	
	
	
</template>

<script>
	export default{
		name : 'shopapplynews',
		data () {
			return{
				list: [],
				listLoading: false
			}
		}
	}
</script>

<style>
</style>
