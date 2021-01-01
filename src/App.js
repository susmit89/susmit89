import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Blogs from "./components/blogs";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import About from "./components/about";
import Contact from "./components/contact";

class App extends Component {
  state = {};

  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/blogs" render={(props) => <Blogs {...props} />} />
            <Route path="/about" component={About}></Route>
            <Route path="/contact" component={Contact}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/blogs" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
