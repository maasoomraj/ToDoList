import React,{ Component } from 'react';
// import logo from '../assets/logo.png';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {FormGroup, FormControl , Button } from 'react-bootstrap';
const axios = require('axios');
import DateTimePicker from 'react-datetime-picker';
const localStorage = require('localStorage');

class AddTask extends Component {
    state = {
        user : null,
        logout : false,
        description : '',
        comments : '',
        endTime : new Date(),
        typeTask : '',
        status: '',
        redirect : false,
        loading : false,
        error : false
    };

    updateDescription = event => {
        this.setState({description : event.target.value });
    }

    updateComments = event => {
        this.setState({comments : event.target.value });
    }

    updateEndtime = date => {
        console.log(this.state.endTime);
        this.setState({endTime : date });
    }

    updateTypeTask = event => {
        this.setState({typeTask : event.target.value });
    }

    updateStatus = event => {
        this.setState({status : event.target.value });
    }

    addTask = async () => {
        this.setState({ error : false, loading : true });

        const { description , comments, status , typeTask } = this.state;
        const endTime = (this.state.endTime).toString();
        const startTime = (new Date()).toString();
        console.log(startTime);
        await axios.post(window.location.protocol
            + '//'
            + window.location.hostname
            + ":"
            + window.location.port
            + '/api/tasks/addTask' , {
                description : description,
                comments : comments,
                startTime : startTime,
                endTime : endTime,
                typeTask : typeTask,
                userId : localStorage.getItem('token'),
                status : status
            })
            .then(res => {
                console.log("SUCCESS");
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

        console.log(localStorage.getItem('token'));
    }

    
    render(){
        // console.log('this.state', this.state);
        return(
            <div>
                <Navigation />
                <div className='AddTask'>
                    <br />
                    <h3>Add Task -</h3>

                    <FormGroup>
                        <FormControl 
                            input='text'
                            placeholder='Enter Description of Task'
                            value={this.state.description} 
                            onChange={this.updateDescription}
                            className="inputBox"
                        /> 
                    </FormGroup>
                    <FormGroup>
                        <FormControl 
                            input='text'
                            placeholder='Comments'
                            value={this.state.comments} 
                            onChange={this.updateComments}
                            className="inputBox"
                        /> 
                    </FormGroup>
                    <label className="label">Choose expected End :  </label>
                    <DateTimePicker
                        onChange={this.updateEndtime}
                        value={this.state.endTime}
                        className="calendar"
                    />
                    
                    <label className="label">Choose type of Task :  </label>
                    <select onChange={this.updateTypeTask} value={this.state.typeTask} className="dropdown">
                        <option default value="" disabled selected>Select your option</option>
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Others">Others</option>
                    </select>

                    <label className="label">Choose status of Task :  </label>
                    <select onChange={this.updateStatus} value={this.state.status} className="dropdown">
                        <option default value="" disabled selected>Select your option</option>
                        <option value="New Task">New Task</option>
                        <option value="Work in progress">Work in Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <br /><br /><br />
                    <div align='center'>
                        <Button className = 'button' onClick={this.addTask}>Add Task</Button>
                    </div>

                    {this.state.loading ? <div className="flashMessage">Wait .... We are creating your task ..</div> : ''}
                    {this.state.error ? <div className="flashMessage">Error !! Please Retry !!</div> : ''}
                    {this.state.redirect ? <Redirect to='/ViewTask'></Redirect> : '' }
                </div>

            </div>
        );
    }
};

export default AddTask;