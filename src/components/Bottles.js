import React from 'react'
import { APIActions } from '../actions'

class Bottles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count_per_month: [],
      sum_per_month: []
    }
  }

  componentDidMount() {
    APIActions.fetchJSON('/bottles')
      .then(data => {
        this.setState({
          count_per_month: data.count_per_month,
          sum_per_month: data.sum_per_month
        })
      })
  }

  renderBottles = () => {
    let listItems = []
    Object.entries(this.state.count_per_month).forEach(([month, count]) =>
      listItems.push(
        <li key={month}>
          <b>{month}</b>{count}
        </li>
      )
    )

    return (
      <ul>{listItems}</ul>
    )
  }

  render() {
    return (
      <div className="bottles">
        <h2>List of Bottles</h2>
        {this.renderBottles()}
      </div>
    );
  }
}

export default Bottles
