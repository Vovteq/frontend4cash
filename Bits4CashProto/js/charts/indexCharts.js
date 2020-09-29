const options = {
    chart: {
      type: 'area'
    },
    series: [{
        name: 'sales',
        data: [30, 40, 50, 60, 40, 50]
    }],
    xaxis: {
        categories: [2014, 2015, 2016, 2017, 2018, 2019]
    }
};

const chart1 = new ApexCharts(document.querySelector("#chart1"), options);
const chart2 = new ApexCharts(document.querySelector("#chart2"), options);
const chart3 = new ApexCharts(document.querySelector("#chart3"), options);
chart1.render();
chart2.render();
chart3.render();
