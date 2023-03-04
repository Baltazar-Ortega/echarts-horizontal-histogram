var dom = document.getElementById("chart-container");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false
});
var app = {};

var option;

function xAxisFormatter(value, length) {
  if (length === 0) return "";
  let percent = ((value * 100) / length).toFixed(1);
  return percent + "%";
}

// length=32
let sourceData = [
  [143],
  [214],
  [251],
  [26],
  [86],
  [93],
  [176],
  [39],
  [221],
  [188],
  [57],
  [91],
  [191],
  [8],
  [196],
  [177],
  [177],
  [153],
  [201],
  [199],
  [47],
  [81],
  [98],
  [121],
  [37],
  [12],
  [105],
  [168],
  [84],
  [197],
  [155],
  [125]
];

echarts.registerTransform(ecStat.transform.histogram);

// Create bins
const bins = ecStat.histogram(sourceData, "sturges");
console.log("bins: ", bins);

option = {
  dataset: [
    {
      source: sourceData
    },
    {
      transform: {
        type: "ecStat:histogram",
        config: {}
      }
    }
  ],
  tooltip: {},
  xAxis: [
    {
      min: 0,
      max: 31,
      scale: true,
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: (value) => xAxisFormatter(value, sourceData.length),
        interval: 0,
        show: true
      }
    },
    {
      scale: true,
      splitLine: {
        show: false
      },
      axisTick: { show: false },
      axisLabel: { show: false },
      axisLine: { show: false },
    },
    {
      type: "value"
    },
  ],
  yAxis: [
    // This makes the histogram horizontal
    {
      type: "category",
      axisTick: { show: true },
      axisLabel: { show: true },
      axisLine: { show: false },
      splitLine: {
        show: false
      },
    },
    {
      type: "value",
    },
    {
      type: "value",
    }
  ],
  series: [
    {
      name: "histogram",
      type: "bar",
      barWidth: "99.3%",
      xAxisIndex: 0,
      yAxisIndex: 0,
      label: {
        show: true,
        position: "right"
      },
      datasetIndex: 1
    },
    {
      name: "",
      type: "line",
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: [300],
      symbol: '',
      symbolSize: 0,
      markLine: {
        symbol: '',
        label: {
          show: true
        },
        lineStyle: {
          color: "black",
          type: "dashed"
        },
        data: [
          {
            yAxis: 225,
            name: "Upper Limit",
            lineStyle: {
              color: 'gray',
            },
          },
          {
            name: "Lower Limit",
            yAxis: 70
          }
        ]
      },
      markArea: {
        data: [
          [
            {
              yAxis: 100,
              xAxis: 0,
              itemStyle: {
                color: "rgb(242, 182, 182)"
              }
            },
            {
              yAxis: 170,
            }
          ]
        ]
      },
    },
    {
      name: "curve",
      type: "line",
      areaStyle: {
        color: "blue"
      },
      lineStyle: {
        width: 3,
        color: "blue"
      },
      xAxisIndex: 2,
      yAxisIndex: 0,
      smooth: true,
      label: {
        show: true,
        position: "top"
      },
      // data: [0, 50, 100, 150, 200, 250]
      datasetIndex: 1
    },
  ]
};

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);