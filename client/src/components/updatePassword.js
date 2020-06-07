import React,{ Component } from 'react';
// import logo from '../assets/logo.png';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {FormGroup, FormControl , Button } from 'react-bootstrap';
const axios = require('axios');
import DateTimePicker from 'react-datetime-picker';
const localStorage = require('localStorage');

class updatePassword extends Component {
    state = {
        user : null,
        logout : false,
        redirect : false,
        loading : false,
        error : false,
        oldPassword : '',
        newPassword : ''
    };

    updateOldPassword = event => {
        this.setState({oldPassword : event.target.value });
    }

    updateNewPassword = event => {
        this.setState({newPassword : event.target.value });
    }

    changePassword = async () => {
        this.setState({ error : false, loading : true });

        // console.log(this.state.newPassword);

        await axios.post(window.location.protocol
            + '//'
            + window.location.hostname
            + ":"
            + window.location.port
            + '/api/user/updatePassword' , {
                oldPassword : this.state.oldPassword,
                newPassword : this.state.newPassword,
                userId : localStorage.getItem('token')
            })
            .then(res => {
                // console.log("SUCCESS");
                this.setState({ loading : false , redirect : true });
            })
            .catch(error => {
                this.setState({ loading : false , error : true });
            });
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'))
        if(!user){
            this.setState({ logout : true });
        }else{
            this.setState({ user : user });
        }

        // console.log(localStorage.getItem('token'));
    }

    
    render(){
        // console.log('this.state', this.state);
        return(
            <div>
                <Navigation />
                <div className='AddTask'>
                    <br />
                    <h3>Change Password -</h3>

                    <FormGroup>
                        <FormControl 
                            input='text'
                            placeholder='Enter Old Password'
                            value={this.state.oldPassword} 
                            onChange={this.updateOldPassword}
                            className="inputBox"
                        /> 
                    </FormGroup>

                    <FormGroup>
                        <FormControl 
                            input='text'
                            placeholder='Enter New Password'
                            value={this.state.newPassword} 
                            onChange={this.updateNewPassword}
                            className="inputBox"
                        /> 
                    </FormGroup>
                    
                    <div align='center'>
                        <Button className="button-update" onClick={this.changePassword}>Change Password</Button>
                    </div>

                    {this.state.loading ? <div className="flashMessage">Wait .... We are updating ..</div> : ''}
                    {this.state.error ? <div className="flashMessage">Error !! Incorrect Data !!</div> : ''}
                    {this.state.redirect ? <Redirect to='/'></Redirect> : '' }
                </div>

            </div>
        );
    }
};

export default updatePassword;