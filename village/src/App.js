import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {

    axios
      .get("http://localhost:3333/smurfs")

      .then(response => {
        console.log(response);
        this.setState({ smurfs: response.data });
      })

      .catch(err => {
        console.log(err);
      });
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  //smurf list updater
  smurfListUpdater = smurfData => {
    this.setState({
      smurfs: smurfData
    });
  }

  deleteSmurfFromServer = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(response => {
        console.log(response);
        this.setState({
          smurfs: response.data
        });
      })

      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <NavLink to="/smurf-form">Smurf Form </NavLink>
        <br></br>
        <NavLink exact to="/">Smurfs</NavLink>
        <Route
          path="/smurf-form"
          render={props =>
            <SmurfForm {...props} smurfs={this.state.smurfs} smurfListUpdater={this.smurfListUpdater} />} />
        <Route
          exact path="/"
          render={props =>
            <Smurfs  {...props} smurfs={this.state.smurfs} deleteSmurfFromServer={this.deleteSmurfFromServer} />} />
      </div>
    );
  }
}

export default App;
