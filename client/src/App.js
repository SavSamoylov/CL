import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Header, Search} from "./components";
import {PostPage} from "./pages";
import './App.css';

class App extends Component {
  render() {
    return (

      <Router>
        <div className="App">
          <Header />
          <Search />
          <Switch>
            <Route exact path="/" />
            <Route path="/region/forsale/category/post/:postId" component={PostPage} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
