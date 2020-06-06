import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class App extends Component {
    state = {
        redirect : false
    };

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'))
        if(user){
            this.setState({ redirect : true });
        }
    }
    
    render() {
        return (
            <div>
                <div className='navbar'>
                        <div className="title">TO DO LIST</div>
                </div>

                <Link to='/Login' className="button-vote">LOGIN</Link>
                <Link to='/SignIn' className="button-vote">SIGN UP</Link>

                <div className="home">
                    This WebApp has been submitted by Masoom Raj, IIT Jodhpur.
                    <div>
                        A Submission for StackHack 1.0 organsised by Hackerearth.
                    </div>
                </div>

                {this.state.redirect ? <Redirect to='/home'></Redirect> : '' }
            </div>
        )
    }
};

export default App;