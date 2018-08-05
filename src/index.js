import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

import Home from './components/jobs/Home';
import Login from './components/Login';
import viewJobs from './components/jobs/Viewdata';
import searchJobs from './components/jobs/Searchdata';
import editJobs from './components/jobs/Editdata';

import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
	<Router>
	    <div>

	    	<nav className="navbar navbar-default">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <a className="navbar-brand" href="/">AJOBTHING</a>
			    </div>
			    <ul className="nav navbar-nav">
			      <li className="active"><a href="/">Job Match</a></li>
			      <li><a href="/login">Login</a></li>			      
			    </ul>
			  </div>
			</nav>


	      <Route path="/" component={Home} exact/>
	      <Route path="/login" component={Login} />
	      <Route path="/view" component={viewJobs} />
	      <Route path="/edit" component={editJobs} />
	      <Route path="/search" component={searchJobs} />
	    </div>
	  </Router>
	, document.getElementById('root'));
registerServiceWorker();


