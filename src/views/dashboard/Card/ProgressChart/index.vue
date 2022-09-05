<template>
  <div class="charts">
    <!-- 容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "ProgressChart",
  mounted() {
    // 初始化charts实例
    let progressChart = echarts.init(this.$refs.charts);
    // 配置数组
    progressChart.setOption({
      xAxis: {
        show: false,
        // 最小值与最大值设置
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        // 均分，在y轴均分可以使他在y轴上排列
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: "darkseagreen",
          // 柱状图的宽度
          barWidth: 10,
          // 背景颜色
          showBackground: true,
          backgroundStyle: { color: "#eee" },
          // 文本
          label: {
            show: true,
            // 文本内容
            formatter: "|",
            // 文本标签位置
            position: "right",
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