import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import  ExpandTable from './core/expand-table'
import  CSVTable from './core/csv-table'
import ExpandTableComponent from './component/expand-table';
import DataSourceComponent from './component/export-datasource';
import ExportTableComponent from './component/export-table';
import {makeData, getAPIdata1} from './utils/utils' //Dummy data makeData = static data, getAPIdata1= live json data
export default class App extends React.Component {


    constructor(props){
      super(props)
    }

  

    render(){


      return (

    <Router>
        <div className="App">
          <h2>Welcome to React Router Tutorial</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Expand Table </Link></li>
            <li><Link to={'/export-data-source'} className="nav-link">Export With data source</Link></li>
            <li><Link to={'/export-table'} className="nav-link">Export Table</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={ExpandTableComponent} />
              <Route path='/export-data-source' component={DataSourceComponent} />
              <Route path='/export-table' component={ExportTableComponent} />
          </Switch>
        </div>
      </Router>

        
      );
    }
}


