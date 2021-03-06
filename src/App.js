import React, { Component } from "react";
import { Graph } from "./components";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <Graph />
      </div>
    );
  }
}

export default App;
