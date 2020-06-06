import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const localStorage = require('localStorage');

class Navigation extends Component {
    state = {
        logout : false,
        user : null
    };

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'))
        if(!user){
            this.setState({ logout : true });
        }else{
            this.setState({ user : user });
        }
    }

    logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.setState({ logout : true });
    }

    render() {
        return (
            <div className='navbar'>
                <Link to ='/Home' className ="heading">ToDoList</Link>
                <Link to='/AddTask'>+ New Task</Link>
                <Link to='/ViewTask'>MyTasks</Link>
                <div onClick={this.logout} className="logout">Logout</div>
                {this.state.user ? <div className="username">Signed In as {this.state.user.name}</div> : ''}
                {/* <Link to='/receive-transaction'>Receive</Link>
                <Link to='/transaction-pool-map'>Transaction Pool Map</Link>
                <Link to='/trace'>Trace</Link>
                <Link to='/Log-out'>Logout</Link> */}

                {this.state.logout ? <Redirect to='/'></Redirect> : ''}

            </div>
        );
    }
}

export default Navigation;