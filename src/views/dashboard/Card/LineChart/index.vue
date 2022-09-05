<template>
  <div class="charts">
    <!-- 容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineChart",
  mounted() {
    // 初始化charts实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数组
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [10, 7, 37, 15, 48, 9, 29, 10, 14],
          smooth: true,
          //   拐点样式设置
          itemStyle: {
            opacity: 0,
          },
          // 线条样式设置
          lineStyle: {
            color: "purple",
          },
          // 填充颜色
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple",
                },
                {
                  offset: 1,
                  color: "#fff",
                },
              ],
              global: false,
            },
          },
        },
      ],
      // 布局模式
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
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