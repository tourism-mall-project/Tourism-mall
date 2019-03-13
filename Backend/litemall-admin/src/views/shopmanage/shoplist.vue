/* eslint disable */
<template>
  <div class="app-container">
    <!-- 查找 -->
    <div class="filter-container">
      <el-input v-model="listQuery.username" clearable class="filter-item" style="width: 200px;" placeholder="请输入负责人名字"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 商家列表 -->
    <el-table v-loading="listLoading" :data="list" size="small" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" width="100px" label="商家id" prop="id"/>
      <el-table-column align="center" label="店铺名称" prop="shopname"/>
      <el-table-column align="center" property="logo" label="logo">
        <template slot-scope="scope">
          <img :src="scope.row.logo" width="40">
        </template>
      </el-table-column>
      <el-table-column align="center" label="负责人" prop="username"/>
      <el-table-column align="center" label="客服电话" prop="serviceMobile"/>
      <el-table-column align="center" label="详细地址" prop="address"/>
      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" @click="handledetail(scope.row)">查看详情</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="detailDialogVisible" title="商品详情">
      <div >
        <el-form :data="detail" label-position="left" class="table-expand">
          <el-form-item label="id" prop="id">
            <el-input v-model="detail.id" readonly/>
          </el-form-item>
          <el-form-item label="负责人名字" prop="username">
            <el-input v-model="detail.username" readonly/>
          </el-form-item>
          <el-form-item label="店铺名称" prop="shopname">
            <el-input v-model="detail.shopname" readonly/>
          </el-form-item>
          <el-form-item label="创建时间" prop="addTime">
            <el-input v-model="detail.addTime" readonly/>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="detail.address" readonly/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="detail.password" readonly/>
          </el-form-item>
          <el-form-item label="位置区域" prop="region">
            <el-input v-model="detail.region" readonly/>
          </el-form-item>
          <el-form-item label="客服电话" prop="serviceMobile">
            <el-input v-model="detail.serviceMobile" readonly/>
          </el-form-item>
          <el-form-item label="营业时间" prop="workTime">
            <el-input v-model="detail.workTime" readonly/>
          </el-form-item>
          <el-form-item label="营业执照" prop="workimgUrl">
            <el-input v-model="detail.workimgUrl" readonly/>
          </el-form-item>
          <el-form-item label="logo" prop="url">
            <el-input v-model="detail.url" readonly/>
          </el-form-item>
          <el-form-item label="更新时间" prop="updateTime">
            <el-input v-model="detail.updateTime" readonly/>
          </el-form-item>
          <el-form-item label="门头图片" prop="storefrontimgUrl">
            <el-input v-model="detail.storefrontimgUrl" readonly/>
          </el-form-item>
          <el-form-item label="头像图片" prop="avatar">
            <el-input v-model="detail.avatar" readonly/>
          </el-form-item>
          <el-button type="primary" size="mini" @click="returndetail">返回</el-button>

          <!-- </template>
							<el-button type="primary" size="mini" @click="handledetail(scope.row)">查看详情</el-button>
						</template>
						 -->
          <!-- <el-form-item label="logo">
							<img v-for="pic in props.row.gallery" :key="pic" :src="pic" class="gallery">
					  </el-form-item>
					  <el-form-item label="行业分类" prop="username">
							<span>{{ props.row.industryClassify }}</span>
					  </el-form-item>
					  <el-form-item label="所属区域">
						<span>{{ props.row.region }}</span>
					  </el-form-item>
					  <el-form-item label="店内设施">
						<span>{{ props.row.facilities }}</span>
					  </el-form-item>
					  <el-form-item label="门店介绍">
						<span>{{ props.row.shopIntroduce }}</span>
					  </el-form-item>
					  <el-form-item label="营业时间">
						<span>{{ props.row.workTime }}</span>
					  </el-form-item>
					  <el-form-item label="营业执照">
						<span>{{ props.row.url.btempFilePaths }}</span>
					  </el-form-item
					  <el-form-item label="门头图片">
						<span>{{ props.url.ctempFilePaths }}</span>
					  </el-form-item>
					  <el-form-item label="头像">
						<span>{{ props.url.dtempFilePaths }}</span>
					  </el-form-item> -->
        </el-form>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getlist" />

    <!-- 返回顶部 -->
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

  </div>
</template>

<script>
import { listshops, deleteshop, detailshop } from '@/api/shop'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination'
export default{
  name: 'Shoplist',
  components: { BackToTop, Pagination },
  data() {
    return {
      total: 0,
      listLoading: false,
      list: [],
      shopname: '111',
      listQuery: {
				  page: 1,
				  limit: 20
      },
      detailDialogVisible: false,
      detail: []
    }
  },
  created() {
		  this.getlist()
  },
  methods: {
    // 获取商家列表
    getlist() {
      this.listLoading = true
      listshops(this.listQuery).then(response => {
				  this.list = response.data.data.items
				  this.total = response.data.data.total
				  this.listLoading = false
      }).catch(() => {
				  this.list = []
				  this.total = 0
				  this.listLoading = false
      })
    },
    handleCreate() {
      this.$router.push({ path: '/shopmanage/createshop' })
    },
    handleUpdate(row) {
			  this.$router.push({ path: '/shopmanage/edit', query: { id: row.id }})
    },
    handledetail(row) {
      this.detailDialogVisible = true
      const shopId = row.id
      detailshop(row.id).then(response => {
				  this.detail = response.data.data
      }).catch(() => {

      })
    },
    returndetail() {
      this.detailDialogVisible = false
    },
    handleDelete(row) {
      deleteshop(row).then(response => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      })
    },
    // find
    handleFilter() {
			  this.listQuery.page = 1
			  this.getlist()
    }

  }
}
</script>

<style>
</style>
