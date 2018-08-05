import React, { Component } from 'react';
const mainAPI = "http://private-anon-01287be5a8-frontendtestmaukerja.apiary-proxy.com/job";

class Viewdata extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      data: [],
	      responsibilites : [],
	      benefit : [],
	      parameter : null,
	      language : [],
	      items : [],
	      loadEdit : false,
	      email : null,
	      contact : null,
	      whatsapp : null
	    }

	  }

	componentDidMount(){
		const par = this.props.location		
		let apiProcess = mainAPI+'/'+par.state		
			fetch(apiProcess)
		      .then(res => res.json())
		      .then(res => {		      	
		        this.setState({
		          data: res,
		          responsibilites : res.responsibilites,
		          benefit : res.benefit,
		          language : res.requirements.language,
		          items : res.requirements.items,
		          contact : res.employer_contact.phone,
		          email : res.employer_contact.email,
		          whatsapp : res.employer_contact.whatsapp,
		        })
		      })	
	}

	render() {
      
      var responsibilites = [];
		for (var i = 0; i < this.state.responsibilites.length; i++) {
		    responsibilites.push(this.state.responsibilites[i]);
		}

      var benefites = [];
		for (var j = 0; j < this.state.benefit.length; j++) {
		    benefites.push(this.state.benefit[j]);
		}

	  var language = [];
		for (var k = 0; k < this.state.language.length; k++) {
		    language.push(this.state.language[k]);
		}

	  var items = [];
		for (var l = 0; l < this.state.items.length; l++) {
		    items.push(this.state.items[l]);
		}

      return (
        	
      		<div className="container">
		        <div className="row">
		            <div className="col-lg-8">		                
			                <h1><a href="">{this.state.data.title}</a></h1>
			                <p className="lead">
			                	<i className="fa fa-user"></i> by <a href="">{this.state.data.company}</a>
			                </p>
			                <p><i className="fa fa-calendar"></i> Posted on August 24, 2014 at 9:00 PM</p>
			                
			                <p><i className="fa fa-tags"></i> Job Type: <a href=""><span className="badge badge-info">{this.state.data.type}</span></a> </p>
			                <p><i className="fa fa-tags"></i> Total Views: {this.state.data.views} </p>
			                <hr></hr>
			                <h4>
			                	Description :
			                </h4>
			                <p>
			                	{this.state.data.description}
			                </p>
			                <hr></hr>
			                <h4>
			                	Responsibilites :
			                </h4>
			                {responsibilites.map(resp =>
	                          <ul >
	                            <li key={resp}>{resp}</li>
	                          </ul>
	                        )}
	                        <hr></hr>
	                        <h4>
			                	Requirements :
			                </h4>
			                Language :
			                {language.map(resp =>
	                          <ul >
	                            <li key={resp}>{resp}</li>
	                          </ul>
	                        )}
	                        Item :
	                        {items.map(resp =>
	                          <ul >
	                            <li key={resp}>{resp}</li>
	                          </ul>
	                        )}
	                        <hr></hr>
	                        <h4>
			                	Benefit :
			                </h4>
			                <h4></h4>
			                {benefites.map(resp =>
	                          <ul >
	                            <li key={resp}>{resp}</li>
	                          </ul>
	                        )}
			                <hr></hr>

			                <h4>
			                	Contact Us :
			                </h4>
			                <p>Phone : {this.state.contact}</p>
			                <p>Email : {this.state.email}</p>
			                <p>Whatsapp : {this.state.whatsapp}</p>
			                <h4></h4>
			                
			                <hr></hr>
			                Nationality : {this.state.data.nationality}
					</div>
				</div>
			</div>			

      );
   }
}

export default Viewdata;