import React, { Component } from 'react';
import './App.css';
import Dashboard from "./app/containers/Dashboard";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            friendId:2,
            chats: ""
        };
    }

    componentDidMount() {
        const userId = window.prompt('Enter Your User Id: ');
        this.setState({ userId });
        localStorage.setItem('userId', userId);
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
                <Dashboard userId={this.state.userId} />
            </header>
          </div>
        );
  }
}

export default App;
