import React, { Component } from 'react';
import viewJobs from './Viewdata';
import { Route, Link } from "react-router-dom";
import _ from 'lodash';
const mainAPI = "http://private-anon-01287be5a8-frontendtestmaukerja.apiary-proxy.com/job";
const api2 = "http://private-27298f-frontendtestmaukerja.apiary-mock.com/jobs?limit=20";

class Searchdata extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      data: [],
	      searchResult:null
	    }

	  }

	componentDidMount(){
		const searchResult = this.props.location.state				
		fetch(api2)
	      .then(res => res.json()) 
	      .then(res => {                           
	        var results = res.toString().toLowerCase()
	        results=_.filter(res,function(item){
	          return item.company.indexOf(searchResult)>-1;
	        });                	          
	          this.setState({
	              data: results,
	              searchResult : searchResult
	          })
	      })
	}

	render() {
      
      if (this.state.data.length > 0) {	  
	      return (
	        	
	      		<div className="container">
	      			{this.state.data.map(member =>
						<div className="row">
					        <p>Search result .... : <b><i>{this.state.searchResult}</i></b></p>
					        <div className="col-sm-8">
					          <h3 className="title">{member.company}</h3>
					          <p className="text-muted"><span className="glyphicon glyphicon-lock"></span> {member.title}</p>
					          <p>{member.description}</p>				          				          
					          <Link to={
	                          {
	                            pathname : '/view/'+member.id,
	                            state : member.id,
	                            component : 'views'
	                          }
	                        } className="btn btn-primary btn-md">Read More</Link>
					        </div>
					      </div>
					)}
					<Route path="view/:member" component={viewJobs} />
				</div>	


	      );
	  }else{
	  	return  (
	        	
	      		<div className="container">
	      			
						<div className="row">
					        <p>Search result .... : <b><i>{this.state.searchResult}</i></b></p>
					        <div className="col-sm-8">
					          <h3 className="title">Job not found</h3>					          
					        </div>
					      </div>
					
					
				</div>	


	      );
	  }
   }
}

export default Searchdata;