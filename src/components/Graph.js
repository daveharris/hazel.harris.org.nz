import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { APIActions } from "../actions";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottles_per_week: [],
      solids_per_week: []
    };
  }

  componentDidMount() {
    APIActions.fetchJSON("/bottles/week").then(data => {
      this.setState({
        bottles_per_week: data
      });
    });

    APIActions.fetchJSON("/solids/week").then(data => {
      this.setState({
        solids_per_week: data
      });
    });
  }

  renderGraph = () => {
    const dates = Object.keys(this.state.bottles_per_week).map(date => {
      return moment(date, "YYYY-MM-DD").format("Do MMMM YYYY");
    });

    const bottles_data = Object.values(this.state.bottles_per_week);
    const solids_data = Object.values(this.state.solids_per_week);

    const data = {
      labels: dates,
      datasets: [
        {
          label: "Total bottles (ml) per Week",
          data: bottles_data,
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
        },
        {
          label: "Total solids (gm) per Week",
          data: solids_data,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255,99,132,0.4)",
          pointHoverBorderColor: "rgba(255,99,132,1)",
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
