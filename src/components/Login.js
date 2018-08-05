import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = { 
            msg : false,
            success : false,
            fail : false,
            isLogon:undefined
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {

        this.setState({
          isLogon: (cookies.get('user')==='logon') ? true : undefined
        })         

    }

    onSubmit(e) {
        
        e.preventDefault();        
        let user = e.target.elements.username.value
        let pass = e.target.elements.password.value   
        if(user==='' || pass===''){
            this.setState({
                msg : true,
                fail : true,
                success : false         
            }) 
        }else{     
            if(user==='admin' && pass==='admin'){
                let status = (cookies.get('user')==='logon') ? true : false
                if (!status) {
                    cookies.set('user', 'logon', { path: '/' }); 
                    this.props.history.push('/')   
                }else{
                    alert('Already login')
                }                
                
            }else{                
                this.setState({
                    msg : true,
                    fail : true,
                    success : false         
                }) 
            }
        }

    }

    logout(){
        cookies.remove('user', 'logon', { path: '/' });    
        this.props.history.push('/')
    }

   render() {            
      if (!this.state.isLogon) {
          return (
                <div className="container">
                    <Helmet>
                      <title>Login</title>
                    </Helmet>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="well login-box">
                                <form  onSubmit={this.onSubmit}>
                                    <legend>Login</legend>
                                    <div className="form-group">
                                        
                                        <label htmlFor="username">Enter username</label>
                                        <input id="username" name="username" type="text"  className="form-control"/>
                        
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input id="password" name="password" type="password" className="form-control"  />
                                    </div>
                                    <div className="form-group text-center">
                                        <button className="btn btn-danger btn-cancel-action">Cancel</button>
                                        <input type="submit" className="btn btn-success btn-login-submit" value="Login" />
                                    </div>
                                    
                                    {
                                        this.state.fail && this.state.msg ?
                                        <div className="alert alert-danger">
                                        <strong>Danger!</strong> Gagal Login.
                                        </div> : null
                                    }
                                    {
                                        this.state.success && this.state.msg ?
                                        <div className="alert alert-success">
                                        <strong>Success!</strong> Login successfully.
                                        </div> : null
                                    }

                                </form>
                            </div>
                       
                        </div>
                    </div>
                </div>        
          

          );
      } else{
        return(
            <div className="row">
            <div className="col-md-4">
                Anda sudah login, silahkan <span className="btn btn-danger btn-xs" onClick={() => this.logout()}>Logout</span>
            </div>
            </div>
        )
      }
   }
}
export default Login;