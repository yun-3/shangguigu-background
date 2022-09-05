<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <!-- 按钮  -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          style="margin: 10px 0"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 表格：展示平台属性 -->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column
            prop="prop"
            label="序号"
            width="80px"
            align="center"
            type="index"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150px">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                style="margin: 3px 8px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button>取消</el-button>
        <el-table
          border
          style="width: 100%; margin: 20px 0"
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            prop="prop"
            label="序号"
            width="80"
            type="index"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="tolook(row)"
                @keyup.native.enter="tolook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <template>
                <!-- 气泡确认框 -->
                <el-popconfirm
                  :title="`确定删除${row.valueName}吗？`"
                  @onConfirm="deleteAttrValue($index)"
                >
                  <el-button
                    slot="reference"
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                  ></el-button>
                </el-popconfirm>
              </template>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="addOrUpdateAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接收平台属性的字段
      attrList: [],
      // 这个属性控制table表格显示与隐藏
      isShowTable: true,
      // 收集新增|修改属性使用
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性值，多个
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 3,
      },
    };
  },
  methods: {
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
        this.getAttrList();
      }
    },
    // 获取平台属性的数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$api.attr.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 添加属性值回调
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrList.id, // 相应的属性名的id
        valueName: "",
        // 因为这里的数据是data，而且是push'进去的，所以vue底层可以检测到flag的变化
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性按钮的回调
    addAttr() {
      // 切换table显示与隐藏
      this.isShowTable = false;
      // 清除数据
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性值，多个
        ],
        categoryId: this.category3Id, //三级分类的id
        categoryLevel: 3,
      };
    },
    // 修改某一个属性
    updateAttr(row) {
      this.isShowTable = false;
      // 由于数据结构中存在对象里面套数组，数组里面套对象，因此需要使用深拷贝
      this.attrInfo = cloneDeep(row);
      // 修改某一个属性的时候，将相应的属性值的元素加上flag
      this.attrInfo.attrValueList.forEach((item) => {
        // 这样也可以给属性值添加flag自动，但会发现试图不会跟着变化（因为flag不是响应式数组）
        // item.flag = false;
        this.$set(item, "flag", false);
      });
    },
    // 查看与编辑模式切换
    tolook(row) {
      // 让input消失，显示span
      if (row.valueName.trim() == "") {
        this.$message("请输入正常属性值");
        return;
      }
      // 新增的属性值不能重复
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        // 需要将row从数组里面判断的时候去除
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepeat) {
        this.$message("请不要输入重复的属性值");
        return;
      }
      row.flag = false;
    },
    // 点击span回调变成编辑模式
    toEdit(row, index) {
      row.flag = true;
      // 获取input节点，实现自动聚焦
      // 需要注意，点击span的时候，切换为input变为编辑模式，但对于浏览器而言，页面重绘与重排是需要时间的，
      // 点击span时，重绘重排一个input是耗费时间的，因此我们不可能一点击span立马获取到input
      // $nextTick，当节点渲染完毕了，会执行一次
      // 这里index不能.index，因为他是变动的
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 气泡确认框：确认删除属性值
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    async addOrUpdateAttr() {
      // 整理参数：1、如果用户添加了很多属性值，且属性值为空的不该提交给服务器
      // 2、把flag拿掉
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          // 过滤掉属性值不是空的
          if (item.valueName != "") {
            // 删除flag
            delete item.flag;
            return true;
          }
        }
      );
      try {
        await this.$api.attr.reqAddOrUpdateAttr(this.attrInfo);
        this.isShowTable = true;
        this.$message({ type: "success", message: "保存成功" });
        this.getAttrList();
      } catch (error) {
        this.$message("保存失败");
      }
    },
  },
};
</script>

<style scoped>
</style>