<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="scene != 0" />
    </el-card>
    <el-card>
      <!-- 底部将来有三部分切换 -->
      <div v-show="scene == 0">
        <!-- 这里展示SPU列表的结构 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table style="width: 100%; margin: 20px 0" border :data="records">
          <el-table-column
            prop="prop"
            label="序号"
            width="80px"
            type="index"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改sku"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="handler(row)"
              ></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除sku"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          @current-change="getSpuList"
          @size-change="handleSizeChange"
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,total, sizes"
          :total="total"
        >
        </el-pagination>
      </div>

      <!-- 添加spu|修改spu -->
      <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu" />

      <!-- 添加sku -->
      <SkuForm v-show="scene == 2" @changeKuScene="changeKuScene" ref="sku" />
    </el-card>

    <!-- sku列表展示 -->
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" style="width: 100%" v-loading="loading">
        <el-table-column
          property="skuName"
          label="名称"
          width="width"
        ></el-table-column>
        <el-table-column
          property="price"
          label="价格"
          width="width"
        ></el-table-column>
        <el-table-column
          property="weight"
          label="重量"
          width="width"
        ></el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from "./SkuForm";
import SpuForm from "./SpuForm";

export default {
  name: "Spu",
  components: { SkuForm, SpuForm },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 控制三级联动的可操作性
      show: true,
      page: 1, //分页器当前第几页
      limit: 3, // 每一页需要展示多少条数据
      // spu列表数据
      records: [],
      // 分页器一共需要展示数据的条数
      total: 0,
      scene: 0, //0代表展示SPU列表数据，1代表添加spu|修改sp，2代表添加sku
      // 控制对话框显示与隐藏
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      loading: true,
    };
  },
  methods: {
    // 添加spu按钮的回调
    addSpu() {
      this.scene = 1;
      // 通知子组件spuFrom发请求
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 修改spu按钮的忽地奥
    updateSpu(row) {
      this.scene = 1;
      // 获取子组件spuForm，获取到组件自然能调用它的方法，相当于通知他要干什么
      // 在父组件中可以通过ref获取子组件
      this.$refs.spu.initSpuData(row);
    },
    getCategoryId({ categoryId, level }) {
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let result = await this.$api.spu.reqSpuList(page, limit, category3Id);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    // 当分页器的某一个展示数据条数发生变化的回调
    handleSizeChange(limit) {
      //修改参数，发请求
      this.limit = limit;
      this.getSpuList();
    },
    // 点击分页器第几页的按钮的回调
    // handleCurrentChange(page) {
    //   this.page = page;
    //   this.getSpuList();
    // },
    // 自定义事件回调
    changeScene({ scene, flag }) {
      // flag这个形参是为了区分保存是修改还是添加
      // 切换结构
      this.scene = scene;
      // 子组件内容改了，换场景了，所以也要请求新数据
      if (flag == "修改") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
    // 输出spu按钮的回调
    async deleteSpu(row) {
      let result = await this.$api.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    // 添加sku按钮的回调
    addSku(row) {
      this.scene = 2;
      // 父组件调用子组件的方法，让子组件发请求-----三个请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    // sku通知父组件切换场景
    changeKuScene(scene) {
      this.scene = scene;
    },
    // 查看sku列表按钮回调
    async handler(spu) {
      this.dialogTableVisible = true;
      this.spu = spu;
      // 获取sku列表数据
      let result = await this.$api.spu.reqSkuList(spu.id);
      if (result.code == 200) {
        this.skuList = result.data;
        this.loading = false;
      }
    },
    // 关掉对话框
    close(done) {
      // loading变真
      this.loading = true;
      // 清除sku列表数据
      this.skuList = [];
      // 关闭对话框
      done();
    },
  },
};
</script>

<style scoped>
</style>