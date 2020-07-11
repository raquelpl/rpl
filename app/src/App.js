import React,  {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "./components/main.component";
import Home from "./components/home.component";
import Questions from "./components/questions.component";
import QuestionsId from "./components/questions-id.component";
import './App.css';
import { I18nPropvider, Lang } from './i18n';
import translate from "./i18n/translate";

function App() {

  const [locale, setLocale] = useState(Lang.ENGLISH);

  return (
    <I18nPropvider locale={locale}>
      <Router>
          <header className="App-header">
            <nav className="navbar navbar-expand navbar-dark">
              <button className="btn btn-dark" onClick={() => setLocale(Lang.ENGLISH)}> En </button>
              <button className="btn btn-dark" onClick={() => setLocale(Lang.PORTUGUESE)}> Pt </button>
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to={"/questions"} className="nav-link">
                      {translate('headerAdd')}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                      {translate('headerList')}
                    </Link>
                  </li>
              </div>
            </nav> 
          </header>
          <div className="App-body">       
              <div className="container mt-3">
                <Switch>
                  <Route exact path={["/"]} component={Main} />
                  <Route exact path={["/home"]} component={Home} />
                  <Route exact path={["/questions"]} component={Questions} />
                  <Route exact path={["/questions/id=:id"]} component={QuestionsId} />
                </Switch>
              </div>
          </div>
      </Router>
    </I18nPropvider>
  );
}

export default App;