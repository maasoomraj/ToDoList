import React,{ Component } from 'react';
// import logo from '../assets/logo.png';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
const localStorage = require('localStorage');

class Home extends Component {
    state = {
        user : null,
        logout : false
    };

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'))
        if(!user){
            this.setState({ logout : true });
        }else{
            this.setState({ user : user });
        }
    }

    
    render() {

        return (
            <div className='App'>
                <Navigation />

                <div>
                    <h3>Hey !! </h3>{this.state.user ? <h3>{this.state.user.name}</h3> : ''}
                </div>

                {this.state.logout ? <Redirect to='/'></Redirect> : ''}
            </div>
        );
    }
}

export default Home;