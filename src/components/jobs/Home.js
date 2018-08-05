import React from 'react';
import { Helmet } from 'react-helmet'
import { Route, Link } from "react-router-dom";
import '../../App.css';
import viewJobs from './Viewdata';
import editJobs from './Editdata';
import Cookies from 'universal-cookie';

const mainAPI = "http://private-1e000-frontendtestmaukerja.apiary-mock.com/jobs";
const api2 = "http://private-27298f-frontendtestmaukerja.apiary-mock.com/jobs?limit=20";
const cookies = new Cookies();

class Home extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      data: [],
      matches: [],
      showAdd: false,
      showData: true,
      msgTrue: false,
      msgFalse: false,
      isLogon:undefined
    }    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteMember = this.deleteMember.bind(this);
    this._onAddClick = this._onAddClick.bind(this);
  }

  componentWillMount() {    
    fetch(api2)
      .then(res => res.json()) 
      .then(res => {        
        this.setState({
          isLogon: (cookies.get('user')==='logon') ? true : undefined,
          matches: res,
          loading: false
        })
      })
  }

  _onAddClick() {
    this.setState({
      showData: false,
      showAdd: true,
    });
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

    fetch(mainAPI, {
      method: 'POST',
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
      console.log('response', response)
      return response.json();
    })
      .then(data => {
        if (data.message === 'success') {
          this.setState({
            msgTrue: true,
            msgFalse: false
          })
        }
        alert(data.message)
        console.log('data', data.message)
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

  deleteMember(member) {
    let apiDelete = "http://private-27298f-frontendtestmaukerja.apiary-mock.com/job/"+member  
    fetch(apiDelete, {
      method: 'DELETE'      
    }).then(response => {
      console.log('response', response)      
      return response.json();
    })
      .then(data => {
        alert(data.message)
        if (data.message === 'success') {
          this.setState({
            msgTrue: true,
            msgFalse: false
          })
        }
        console.log('data', data.message)
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
    if (this.state.matches.length === 0) {
      return <div className="loader"></div>
    }    
    return (
      <main role="main" className="container">
        <Helmet>
          <title>List Data</title>
        </Helmet>

        {this.state.showData ?
          <div className="container">
            <div className="row">              
              <button className="btn btn-primary" onClick={this._onAddClick}>Add New Data</button>
            </div>

            <div className="row">
            Total Data : {this.state.matches.length} Records
            </div>
            <div className="row">
            <div className="panel panel-default p50 uth-panel">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Responsibilites</th>
                    <th>Total View</th>
                    <th>View</th>
                    <th>
                    {
                      this.state.isLogon ?
                        <div>
                          Edit | Delete 
                        </div>
                      : null
                    }
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {this.state.matches.map(member =>
                    <tr key={member.id}>
                      <td>{member.id} </td>
                      <td>{member.company} </td>
                      <td>{member.title} </td>
                      <td>{member.location} </td>
                      <td>{member.type} </td>
                      <td>
                        {member.responsibilites.map(resp =>
                          <ul >
                            <li key={resp}>{resp}</li>
                          </ul>
                        )}
                      </td>
                      <td>{member.views} </td>
                      <td><span className="btn btn-success btn-xs">
                        <Link to={
                          {
                            pathname : '/view/'+member.id,
                            state : member.id,
                            component : 'views'
                          }
                        }>View</Link></span>
                      </td>
                      <td>
                      {
                        this.state.isLogon ?
                        <div className="">
                        <span className="btn btn-warning btn-xs">
                          <Link to={
                            {
                              pathname : '/edit/'+member.id,
                              state : member.id
                            }
                          }>Edit</Link>

                          </span>
                        <span className="btn btn-danger btn-xs" onClick={() => this.deleteMember(member.id)}>Delete</span>
                        </div>
                        : null
                      }
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            </div>
          </div> :
          null
        }

        {this.state.showAdd ?
          <div className="container">
            <div className="col-md-8">
              <form onSubmit={this.handleSubmit}>
                <h3>Basic Info</h3>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input id="title" className="form-control" name="title" type="text" />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input id="company" className="form-control" name="company" type="text" />
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input id="location" className="form-control" name="location" type="text" />
                </div>

                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <input id="type" className="form-control" name="type" type="text" />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea className="form-control" name="description"></textarea>
                </div>

                <hr></hr>
                <h3>Employer Contact</h3>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" className="form-control" name="phone" type="number" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" className="form-control" name="email" type="text" />
                </div>

                <div className="form-group">
                  <label htmlFor="whatsapp">Whatsapp</label>
                  <input id="whatsapp" className="form-control" name="whatsapp" type="text" />
                </div>

                <div className="form-group">
                  <label htmlFor="language">Language <span className="badge badge-dark"><i>* separate with semicolon (;)</i></span></label>
                  <textarea className="form-control" name="language"></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="items">Items <span className="badge badge-dark"><i>* separate with semicolon (;)</i></span></label>
                  <textarea className="form-control" name="items"></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="responsibilites">Responsibilites <span className="badge badge-dark"><i>* separate with semicolon (;)</i></span></label>
                  <textarea className="form-control" name="responsibilites"></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="benefit">Benefit <span className="badge badge-dark"><i>* separate with semicolon (;)</i></span></label>
                  <textarea className="form-control" name="benefit"></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="nationality">Nationality</label>
                  <input id="nationality" className="form-control" name="nationality" type="text" />
                </div>


                <button className="btn btn-primary btn-md">Save</button>
              </form>
            </div>
          </div>
          :
          null
        }

          {this.state.msgTrue ?
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className="alert alert-success" role="alert">
                    This is a success alert—check it out!
    </div>
                </div>
              </div>
            </div> :
            null
          }

          {this.state.msgFalse ?
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className="alert alert-danger" role="alert">
                    This is a danger alert—check it out!
    </div>
                </div>
              </div>
            </div> :
            null
          }
          <Route path="view/:member" component={viewJobs} />
          <Route path="edit/:member" component={editJobs} />          
      </main>
    )
  }
}
export default Home;