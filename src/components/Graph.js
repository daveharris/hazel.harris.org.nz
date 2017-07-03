import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { APIActions } from "../actions";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sum_amount_per_week: []
    };
  }

  componentDidMount() {
    APIActions.fetchJSON("/bottles").then(data => {
      this.setState({
        sum_amount_per_week: data.sum_amount_per_week
      });
    });
  }

  renderGraph = () => {
    const dates = Object.keys(this.state.sum_amount_per_week).map(date => {
      return moment(date, "YYYY-MM-DD").format("Do MMMM YYYY");
    });

    const weekly_frequencies = Object.values(this.state.sum_amount_per_week);

    const data = {
      labels: dates,
      datasets: [
        {
          label: "Total ml per Week",
          data: weekly_frequencies,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10
        }
      ]
    };

    const options = {
      responsive: true
    };

    return <Line data={data} options={options} />;
  };

  render() {
    return (
      <div className="Graph">
        {this.renderGraph()}
      </div>
    );
  }
}

export default Graph;
