<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <!-- 第一个card -->
          <Detail title="总销售额" count="￥ 126560">
            <template slot="charts">
              <span
                >周同比&nbsp;&nbsp;56.67%<svg
                  t="1662197548410"
                  class="icon up"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="7438"
                  width="16"
                  height="16"
                >
                  <path
                    d="M194.108395 621.186771 863.223758 621.186771 528.668123 251.67295Z"
                    p-id="7439"
                    fill="#d81e06"
                  ></path></svg
              ></span>
              &nbsp;&nbsp;
              <span
                >日同比&nbsp;&nbsp;19.16%<svg
                  t="1662197687511"
                  class="icon down"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1178"
                  width="16"
                  height="16"
                >
                  <path
                    d="M863.321996 251.674996 194.108395 251.674996 528.677333 621.186771Z"
                    p-id="1179"
                    fill="#1afa29"
                  ></path></svg
              ></span>
            </template>
            <template slot="footer">
              <span>日销售额￥ 12423</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第二个card -->
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <LineChart />
            </template>
            <template slot="footer">
              <span>日访问量 1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第三个card -->
          <Detail title="支付笔数" count="88460">
            <template slot="charts">
              <BarCharts />
            </template>
            <template slot="footer">
              <span>转化率 65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <!-- 第四个card -->
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <ProgressChart />
            </template>
            <template slot="footer">
              <span
                >周同比&nbsp;&nbsp;12%<svg
                  t="1662197548410"
                  class="icon up"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="7438"
                  width="16"
                  height="16"
                >
                  <path
                    d="M194.108395 621.186771 863.223758 621.186771 528.668123 251.67295Z"
                    p-id="7439"
                    fill="#d81e06"
                  ></path></svg
              ></span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span
                >日同比&nbsp;&nbsp;11%<svg
                  t="1662197687511"
                  class="icon down"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1178"
                  width="16"
                  height="16"
                >
                  <path
                    d="M863.321996 251.674996 194.108395 251.674996 528.677333 621.186771Z"
                    p-id="1179"
                    fill="#1afa29"
                  ></path></svg
              ></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineChart from "./LineChart";
import BarCharts from "./BarCharts";
import ProgressChart from "./ProgressChart";
export default {
  name: "Card",
  components: { Detail, LineChart, BarCharts, ProgressChart },
};
</script>

<style>
.up,
.down {
  transform: translateY(5px);
}
</style>