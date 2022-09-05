<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>
      <svg
        t="1662196512275"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3411"
        width="20"
        height="20"
      >
        <path
          d="M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512S276.48 938.666667 512 938.666667 938.666667 747.52 938.666667 512 747.52 85.333333 512 85.333333z m0 796.444445c-203.662222 0-369.777778-166.115556-369.777778-369.777778S308.337778 142.222222 512 142.222222 881.777778 308.337778 881.777778 512 715.662222 881.777778 512 881.777778z"
          p-id="3412"
        ></path>
        <path
          d="M549.546667 641.706667l-29.582223 15.928889c2.275556-12.515556 14.791111-62.577778 35.271112-152.462223 2.275556-9.102222 4.551111-36.408889-15.928889-47.786666-6.826667-3.413333-14.791111-3.413333-22.755556 0-9.102222 3.413333-17.066667 7.964444-23.893333 12.515555-4.551111 3.413333-25.031111 18.204444-60.302222 44.373334-6.826667 5.688889-9.102222 14.791111-4.551112 22.755555s13.653333 10.24 20.48 5.688889l34.133334-20.48-35.271111 150.186667c-3.413333 13.653333 1.137778 22.755556 7.964444 30.72 5.688889 6.826667 14.791111 11.377778 23.893333 11.377777 4.551111 0 7.964444-1.137778 11.377778-2.275555 6.826667-3.413333 31.857778-17.066667 76.231111-43.235556 7.964444-4.551111 11.377778-14.791111 5.688889-22.755555-3.413333-5.688889-13.653333-9.102222-22.755555-4.551111z"
          p-id="3413"
        ></path>
        <path
          d="M523.377778 364.088889m-45.511111 0a45.511111 45.511111 0 1 0 91.022222 0 45.511111 45.511111 0 1 0-91.022222 0Z"
          p-id="3414"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-title">12345</span>
      <span class="main-content">17.1</span>
      <svg
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
        ></path>
      </svg>
      <svg
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
        ></path>
      </svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineCharts",
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
            color: "blue",
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
                  color: "blue",
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

<style scoped>
.header {
  display: flex;
  align-items: center;
}
.header .icon {
  margin-left: 10px;
}
.main {
  margin: 10px 0;
}
.main-title {
  margin-right: 30px;
}
.main-content {
  margin-right: 10px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>