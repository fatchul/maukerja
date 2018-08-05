
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const mainAPI = "http://private-anon-01287be5a8-frontendtestmaukerja.apiary-proxy.com/job";

class Editdata extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      paramId:null,
	      data: [],
	      title: null,
	      company: null,
	      location:null,
	      type:null,
	      description:null,
	      phone:null,
	      email:null,
	      whatsapp:null,
	      language:[],
	      items:[],
	      responsibilites : [],
	      benefit : [],
	      nationality:null,	   
	      notif :null,
	      msgTrue: false,
      	  msgFalse: false,
      	  isLogon:undefined
	    }
	    this.handleSubmit = this.handleSubmit.bind(this);	 
	    this.onTodoChange = this.onTodoChange.bind(this);	 
	  }

	componentDidMount(){
		const par = this.props.location
		let apiProcess = mainAPI+'/'+par.state			
			fetch(apiProcess)
		      .then(res => res.json())
		      .then(res => {		        		      
		        this.setState({
		          isLogon: (cookies.get('user')==='logon') ? true : undefined,
		          paramId:par.state,
		          data: res,
		          title:res.title,
		          company:res.company,
		          location:res.location,
		          type:res.type,
		          description:res.description,		          
		          responsibilites : res.responsibilites.join(';'),
		          benefit : res.benefit.join(';'),
		          phone : res.employer_contact.phone,
		          whatsapp :res.employer_contact.whatsapp,
		          email : res.employer_contact.email,
		          nationality : res.nationality,
		          language : res.requirements.language.join(';'),
		          items : res.requirements.items.join(';')
		        })
		      })	
	}


	onTodoChange(value){
	    return value;
    }
     handleChange(value) {
	    
	    return value;
	  }
    handleSubmit(event) {
	    event.preventDefault();
	   
	    let language = event.target.language.value.split(';')
	    let items = event.target.items.value.split(';')
	    let responsibilites = event.target.responsibilites.value.split(';')
	    let benefit = event.target.benefit.value.split(';')

	    var dataSend = {
	      title: event.target.title.value,
	      company: event.target.company.value,
	      location: event.target.location.value,
	      type: event.target.type.value,
	      description: event.target.description.value,
	      employer_contact: {
	        phone: event.target.phone.value,
	        whatsapp: event.target.whatsapp.value,
	        email: event.target.email.value
	      },
	      requirements: {
	        language: language,
	        items: items
	      },
	      responsibilites: responsibilites,
	      benefit: benefit,
	      nationality: event.target.nationality.value,
	      views: 0
	    };	    
	    fetch(mainAPI+'/'+this.state.paramId, {
	      method: 'PUT',
	      mode: "cors",
	      cache: "no-cache",
	      credentials: "same-origin",
	      headers: {
	        'Content-Type': 'application/json; charset=utf-8',
	        'Accept': 'application/json',
	      },
	      redirect: "follow",
	      referrer: "no-referrer",
	      body: JSON.stringify(dataSend)
	    }).then(response => {
	      console.log('dataresponse', response)
	      return response.json();
	    })
	      .then(data => {
	        if (data.message === 'success') {
	          this.setState({
	            msgTrue: true,
	            msgFalse: false,
	            notif : data.message
	          })
	        }
	        alert(data.message)
	        this.props.history.push('/')
	        return data;
	      })
	      .catch(error => {
	        this.setState({
	          msgFalse: true,
	          msgTrue: false,
	        })
	        return error;
	      });


	  }

	render() {	  
      return (
        	
      		<div className="container">
            <div className="col-md-8">
              <form onSubmit={this.handleSubmit}>
                <h3>Edit Job</h3>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
				  <input type='text' 
				   className="form-control"
				   name="title"
                   onChange={()=>{this.onTodoChange(this.state.title);}} 
                   defaultValue={this.state.title} />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company</label>                                    
                  <input type='text' 
				   className="form-control"
				   name="company"
                   onChange={()=>{this.onTodoChange(this.state.company);}} 
                   defaultValue={this.state.company} />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>                  
				  <input type='text' 
				   className="form-control"
				   name="location"
                   onChange={()=>{this.onTodoChange(this.state.location);}} 
                   defaultValue={this.state.location} />
                </div>

                <div className="form-group">
                  <label htmlFor="type">Type</label>                                   
				  <input type='text' 
				   className="form-control"
				   name="type"
                   onChange={()=>{this.onTodoChange(this.state.type);}} 
                   defaultValue={this.state.type} />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea 
                  	className="form-control"                   	
                  	name="description"
                  	id={'todoName' + this.props.id}
                  	value={this.state.description}                  	
                  	onChange={()=>{this.onTodoChange(this.state.description);}} 
                  >{this.state.description}</textarea>                                   
                </div>

                <hr></hr>
                <h3>Employer Contact</h3>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  
                   <input type='number' 
				   className="form-control"
				   name="phone"
                   onChange={()=>{this.onTodoChange(this.state.phone);}} 
                   defaultValue={this.state.phone} />

                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  
                  <input type='text' 
				   className="form-control"
				   name="email"
                   onChange={()=>{this.onTodoChange(this.state.email);}} 
                   defaultValue={this.state.email} />

                </div>

                <div className="form-group">
                  <label htmlFor="whatsapp">Whatsapp</label>
                  <input type='number' 
				   className="form-control"
				   name="whatsapp"
                   onChange={()=>{this.onTodoChange(this.state.whatsapp);}} 
                   defaultValue={this.state.whatsapp} />
                </div>

                <div className="form-group">
                  <label htmlFor="language">Language <span className="badge badge-dark"><i>* separate with semicolon (;)</i></span></label>
                  <textarea 
                  	className="form-control" 
                  	value={this.state.language} 
                  	name="language"
                  	id={'todoName' + this.props.id}
                  	onInput={()=>this.onTodoChange(this.state.language)}
                  >{this.state.language}</textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="items">Items <span className="badge badge-dark"><i>* separate with semicolon (;)</i></span></label>
                  <textarea 
                  	className="form-control" 
                  	value={this.state.items} 
                  	name="items"
                  	id={'todoName' + this.props.id}
                  	onChange={e => this.onTodoChange(e.target.value)}
                  >{this.state.items}</textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="responsibilites">Responsibilites <span className="badge badge-dark"><i>* separate with semicolon (;)</i></span></label>                  
                  <textarea 
                  	className="form-control" 
                  	value={this.state.responsibilites} 
                  	name="responsibilites"
                  	id={'todoName' + this.props.id}
                  	onChange={e => this.onTodoChange(e.target.value)}
                  >{this.state.responsibilites}</textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="benefit">Benefit <span className="badge badge-dark"><i>* separate with semicolon (;)</i></span></label>
                  <textarea 
                  	className="form-control" 
                  	value={this.state.benefit} 
                  	name="benefit"
                  	id={'todoName' + this.props.id}
                  	onChange={e => this.onTodoChange(e.target.value)}
                  >{this.state.benefit}</textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="nationality">Nationality</label>
                  
                   <input type='text' 
				   className="form-control"
				   name="nationality"
                   onChange={()=>{this.onTodoChange(this.state.nationality);}} 
                   defaultValue={this.state.nationality} />

                </div>


                <button className="btn btn-primary btn-md">Save</button>
              </form>

			  {this.state.msgTrue ?              
	            <p>
	              <div className="row">
	                <div className="col-md-12">
	                  <div className="alert alert-success" role="alert">	                    
	                    Success
	    			  </div>
	                </div>
	              </div>
	            </p> :
	            null
	          }

	          {this.state.msgFalse ?
	            <p>
	              <div className="row">
	                <div className="col-md-8">
	                  <div className="alert alert-danger" role="alert">
	                    This is a danger alert—check it out!
	    				</div>
	                </div>
	              </div>
	            </p> :
	            null
	          }

            </div>
          </div>		


      );
   }
}

export default Editdata;