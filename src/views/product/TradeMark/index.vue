<template>
  <div>
    <!-- 按钮  -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 表格组件 
    data：表格组件将来需要展示的数据------数组类型
    border：给表格加边框
    columb属性
    label：显示标题
    width：对应列的宽度
    align：标题的对齐方式
    注意：elmentUI当中的table是以一列一列来展示数据的
    prop:对应列内容的字段名
    -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column
        prop="prop"
        label="序号"
        width="80px"
        align="center"
        type="index"
      >
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌logo" width="width">
        <!-- 因为用的:data="list"不是v-for，所以要拿到单独每条数据需要用插槽，拿到row -->
        <template slot-scope="{ row, $index }">
          <!-- row是每一行数据回传 -->
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 
      当前第几页，数据总条数、每一页展示的条数、连续页码数
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      current-page：当前第几页
      total：分页器一共需要展示数据条数
      page-size：每一页需要展示多少条数据
      page-sizes：可以设置每一页展示多少条数据
      layout：实现分页器的布局
      :pager-count：按钮数量，如果是7那么中间有5个，两边有两个
    -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper,->, sizes, total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <!-- 对话框
      :visible.sync：控制对话框显示与隐藏用的
      form组件提供了表单验证的功能，只需要通过rules属性传入约定的验证规则，并将Form-Item的prop属性设置为需校验的字段名就好
     -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- form表单 model属性：把表单数据收集到哪个对象身上，将来表单验证，也需要这个属性-->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <!-- :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload" -->
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 这里收集数据不能v-model，因为不是表单元素
          actions：设置图片上传地址
          on-success可以检测到图片上传成功，当图片上传成功会执行一次
          before-upload：上传之前会执行一次
           -->
          <el-upload
            class="avatar-uploader"
            action="brand-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      // 分页器第几页
      page: 1,
      // 当前页数展示数据条数
      limit: 3,
      // 总共数据条数
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示与隐藏控制属性
      dialogFormVisible: false,
      // 收集品牌信息，对象身上的属性不能乱写，要跟后台对应上
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      // 表单验证规则
      rules: {
        // 品牌名称的验证规则
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        // 品牌logo的验证规则
        logoUrl: [
          { required: true, message: "请选择品牌图片", trigger: "change" },
        ],
      },
    };
  },
  // 组件挂在完毕发请求
  mounted() {
    // 获取列表数据方法
    this.getPageList();
  },
  methods: {
    // 获取品牌列表数据方法
    async getPageList(pager = 1) {
      this.page = pager;
      // 解构出参数
      const { page, limit } = this;
      // 获取品牌列表的接口
      // 当你向服务器发送请求的时候，这个函数需要带参数，因此在data中初始化两个字段，代表给服务器传参数
      let result = await this.$api.trademark.reqTradeMarkList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    // 点击添加品牌按钮
    showDialog() {
      this.dialogFormVisible = true;
      // 清除数据
      this.tmForm = { tmName: "", logoUrl: "" };
    },
    // 修改某一个品牌
    updateTradeMark(row) {
      //row：当前用户选中的品牌信息
      this.dialogFormVisible = true;
      // 将已有的品牌信息赋值给tmForm展示出来
      // tmForm存储的就是服务器返回的信息
      // 需要解构之后赋值，让他浅拷贝
      this.tmForm = { ...row };
    },
    // 上传图片相关的回调
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // res：上传成功之后返回前端数据，带图片在服务器上的真实地址
      // file：上传成功之后服务器返回前端数据
      // this.imageUrl = URL.createObjectURL(file.raw)
      // 手机品牌图片数据，因为将来需要带给服务器
      this.tmForm.logoUrl = res.data;
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加或修改的确定按钮
    addOrUpdateTradeMark() {
      // 当全部验证字段通过，才书写业务逻辑
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false;
          // 发请求（添加品牌|修改品牌）
          let result = await this.$api.trademark.reqAddUpdateTradeMark(
            this.tmForm
          );
          if (result.code == 200 || result.code == 20000) {
            // 弹出信息：添加品牌成功、修改品牌成功
            this.$message({
              type: "success",
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
            });
            // 添加或修改品牌成功后，需要再次获取品牌列表进行展示
            console.log(this.tmForm.id);
            this.getPageList(this.tmForm.id ? this.page : 1);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除品牌
    deleteTradeMark(row) {
      this.$confirm(`你确定删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 当用户点击确定按钮时触发
          let result = await this.$api.trademark.reqDeleteTradeMark(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getPageList(this.list.length > 1 ? this.page : this.page - 1);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9e0;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>