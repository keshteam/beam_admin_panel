import React from 'react';
import ReactApexChart from "react-apexcharts";
import axios from "axios";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6", "Level 7", "Level 8", "Level 9", "Level 10", "Level 11", "Level 12"],
        colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0", "#D35400", "#D0ECE7", "#5D6D7E", "#D2B4DE", "#F7DC6F", "#F5CBA7", "#A569BD"],
        dataLabels: {
            enabled: false
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  async componentDidMount() {
    try {
      let {data} = await axios.get(
        `${process.env.REACT_APP_API_URL}user/getCountOnLevel`
      );
      this.setState({
        series: data
      })

    } catch (e) {
      console.log("error in users count on levels", e);
    }
  }

  render() {
    return (
      <div id="chart">
        <h3>Level Completed</h3>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width={380}
        />
      </div>
    );
  }
}

export default PieChart;
