<template>
  <div class="charts">
    <!-- 容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "BarChart",
  mounted() {
    // 初始化charts实例
    let barCharts = echarts.init(this.$refs.charts);
    // 配置数组
    barCharts.setOption({
      xAxis: {
        show: false,
        // 均分
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "bar",
          data: [10, 7, 37, 15, 48, 9, 29, 10, 14, 33, 22, 7],
          smooth: true,
        },
      ],
      // 布局模式
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      tooltip: {},
    });
  },
};
</script>

<style>
.charts {
  height: 100%;
  width: 100%;
}
</style>