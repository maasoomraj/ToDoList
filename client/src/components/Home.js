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

                <div className="home">
                    Welcome to ToDoList WebApp, {this.state.user ? <div className="home-line"> {this.state.user.name}</div> : ''}
                    <br /><br />
                    <div>
                        Email - {this.state.user ? <div className="home-line"> {this.state.user.email}</div> : ''}
                        <br />
                        <Button className="button-update"><Link to='/updateName'>Update Username</Link></Button>
                        <Button className="button-update" onClick={this.viewTask}><Link to='/updatePassword'>Update Password</Link></Button>
                    </div>
                </div>

                {this.state.logout ? <Redirect to='/'></Redirect> : ''}
            </div>
        );
    }
}

export default Home;