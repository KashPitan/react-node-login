import React from "react";
import "./App.css";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Router>
        <Switch>
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
