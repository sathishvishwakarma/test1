import React, { Component } from 'react';
import './App.css';
import Dashboard from "./app/containers/Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Dashboard />
        </header>
      </div>
    );
  }
}

export default App;
