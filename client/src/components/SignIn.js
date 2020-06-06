import React, {Component} from 'react';
import {FormGroup, FormControl , Button } from 'react-bootstrap';
// import Navigation from './common/Navigation';
const axios = require('axios');
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

class SignIn extends Component {
    state = {
        name : '',
        email : '',
        password : '',
        redirect : false,
        loading : false,
        error : false
    };

    updateName = event => {
        this.setState({name : event.target.value });
    }

    updateEmail = event => {
        this.setState({email : event.target.value });
    }

    updatePassword = event => {
        this.setState({password : event.target.value });
    }

    signupRequest = async () => {
        this.setState({ error : false, loading : true });

        await axios.post(window.location.protocol
            + '//'
            + window.location.hostname
            + ":"
            + window.location.port
            + '/api/user/register' , {
                name : this.state.name,
                email : this.state.email,
                password : this.state.password
            })
            .then(res => {
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('user',JSON.stringify(res.data.user));
                this.setState({ loading : false , redirect : true });
            })
            .catch(error => {
                this.setState({ loading : false , error : true });
            });
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'))
        if(user){
            this.setState({ redirect : true });
        }
    }

    render(){
        return(
            <div>
                <div className='navbar'>
                        <div className="title">TO DO LIST</div>
                </div>

                <div className='AddTask'>
                    <br />
                    <h3>Create Account -</h3>

                    <FormGroup>
                        <FormControl 
                            input='text'
                            placeholder='Name'
                            value={this.state.name} 
                            onChange={this.updateName}
                            className="inputBox"
                        /> 
                    </FormGroup>
                    <FormGroup>
                        <FormControl 
                            input='text'
                            placeholder='Email Address'
                            value={this.state.email} 
                            onChange={this.updateEmail}
                            className="inputBox"
                        /> 
                    </FormGroup>
                    <FormGroup>
                        <FormControl 
                            input='text'
                            placeholder='Password'
                            value={this.state.password} 
                            onChange={this.updatePassword}
                            className="inputBox"
                        /> 
                    </FormGroup>
                    <div align='center'>
                        <Button className = 'button' onClick={this.signupRequest}>Sign Up</Button>
                    </div>

                    {this.state.loading ? <div className="flashMessage">Wait .... We are processing ..</div> : ''}
                    {this.state.error ? <div className="flashMessage">Error !! Please Retry !!</div> : ''}
                    {this.state.redirect ? <Redirect to='/home'></Redirect> : '' }
                </div>

                <div>
                    <div className='already'>Already have an account</div>
                    <Link to='/Login' className="button-vote">LOGIN</Link>
                </div>

            </div>
        );
    }
};

export default SignIn;