import React,{ Component } from 'react';
// import logo from '../assets/logo.png';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {FormGroup, FormControl , Button } from 'react-bootstrap';
const axios = require('axios');
import DateTimePicker from 'react-datetime-picker';
const localStorage = require('localStorage');

class updateName extends Component {
    state = {
        user : null,
        logout : false,
        redirect : false,
        loading : false,
        error : false,
        name : ''
    };

    updateName = event => {
        this.setState({name : event.target.value });
    }

    changeName = async () => {
        this.setState({ error : false, loading : true });

        // console.log(this.state.name);

        await axios.post(window.location.protocol
            + '//'
            + window.location.hostname
            + ":"
            + window.location.port
            + '/api/user/updateName' , {
                name : this.state.name,
                userId : localStorage.getItem('token')
            })
            .then(res => {
                // console.log("SUCCESS");
                const user = JSON.parse(localStorage.getItem('user'));
                user.name = this.state.name;
                localStorage.removeItem('user');
                localStorage.setItem('user',JSON.stringify(user));
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
                    <h3>Change Username -</h3>

                    <FormGroup>
                        <FormControl 
                            input='text'
                            placeholder='Enter New Name'
                            value={this.state.name} 
                            onChange={this.updateName}
                            className="inputBox"
                        /> 
                    </FormGroup>
                    
                    <div align='center'>
                        <Button className="button-update" onClick={this.changeName}>Change Username</Button>
                    </div>

                    {this.state.loading ? <div className="flashMessage">Wait .... We are updating ..</div> : ''}
                    {this.state.error ? <div className="flashMessage">Error !! Please Retry !!</div> : ''}
                    {this.state.redirect ? <Redirect to='/'></Redirect> : '' }
                </div>

            </div>
        );
    }
};

export default updateName;