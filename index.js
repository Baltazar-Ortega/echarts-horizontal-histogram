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

const normalDistribution = (mean, std) => (x) => {
  return (
    (1 / (std * Math.sqrt(2 * Math.PI))) *
    Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(std, 2)))
  );
}

// length=32
let barsData = [
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
const timeSeriesData = [
  0.17, 0.96, 1.96, 3, 1.35, 1.24, 1.34, 1.94, 1.94, 1.56,
  1.66, 1.94, 1.75, 1.25, 1.48, 1.28, 2, 2.7, 0.96, 0.52
]

const mean = math.mean(timeSeriesData);
const std = math.std(timeSeriesData);
const normalDistributionData = timeSeriesData.map(normalDistribution(mean, std));

echarts.registerTransform(ecStat.transform.histogram);

// Create bins
const bins = ecStat.histogram(barsData, "sturges");
console.log("bins: ", bins);

option = {
  dataset: [
    {
      source: barsData
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
        formatter: (value) => xAxisFormatter(value, barsData.length),
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
      name: 'Flow(m³/s)',
      type: 'value',
      min: 0,
      max: 5
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
        type: 'category',
        boundaryGap: false,
        axisLine: { onZero: false },
        axisLabel: { show: false },
        data: Array.from({ length: 20 }, () => '2009/6/12 11:00')
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
      name: 'Flow',
      type: 'line',
      xAxisIndex: 2,
      yAxisIndex: 2,
      smooth: true,
      label: {
        show: true,
        position: "top"
      },
      areaStyle: {},
      lineStyle: {
        width: 3,
        color: "blue"

      },
      data: timeSeriesData
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
    
  ]
};

if (option && typeof option === "object") {
  myChart.setOption(option);
}

window.addEventListener("resize", myChart.resize);