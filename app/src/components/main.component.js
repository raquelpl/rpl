import React, { Component  } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import translate from "../i18n/translate";

class Main extends Component {

  render() {
    
    return  (
        <div className="App">  
            <img src={logo} className="App-logo" alt="logo" /> 
            <h1> {translate('messageWelcome')} </h1>
            <Link to={"/home"} className="btn btn-dark">
                {translate('buttonWelcome')}
            </Link>
      </div>
      );
  }
}

export default Main;