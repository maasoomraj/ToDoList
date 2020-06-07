import React,{ Component } from 'react';
// import logo from '../assets/logo.png';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {FormGroup, FormControl , Button } from 'react-bootstrap';
const axios = require('axios');
import DateTimePicker from 'react-datetime-picker';
const localStorage = require('localStorage');

class ViewTask extends Component {
    state = {
        user : null,
        logout : false,
        view : false,
        tasks : [],
        loading : false,
        typeTask : '',
        status : '',
        error : ''
    };

    updateTypeTask = event => {
        // console.log(event.target.value);
        this.setState({ typeTask : event.target.value });
    }

    updateStatus = event => {
        // console.log(event.target.value);
        this.setState({ status : event.target.value });
    }

    viewTask = async () => {

        this.setState({ error : false, loading : true , view : false, tasks : [] });

        let data = {};
        data.userId = localStorage.getItem('token');
        
        if(this.state.typeTask){
            data.typeTask = this.state.typeTask;
        }

        if(this.state.status){
            data.status = this.state.status;
        }

        // console.log(data);

        await axios.post(window.location.protocol
            + '//'
            + window.location.hostname
            + ":"
            + window.location.port
            + '/api/tasks/viewTask' , data)
            .then(res => {
                // console.log("SUCCESS");
                this.setState({ loading : false });
                this.setState({ view : true , tasks : res.data.tasks });
            })
            .catch(error => {
                this.setState({ loading : false , error : true });
            });
    }

    deleteTask = async event => {
        // console.log(event.target.value);
        this.setState({ error : false, loading : true , view : false, tasks : [] });

        await axios.post(window.location.protocol
            + '//'
            + window.location.hostname
            + ":"
            + window.location.port
            + '/api/tasks/delete' , {
                userId : localStorage.getItem('token'),
                _id : event.target.value
            })
            .then(res => {
                // console.log("SUCCESS");
            })
            .catch(error => {
                this.setState({ loading : false , error : true });
            });

        this.viewTask();
    }

    changeWork = async event => {
        // console.log(event.target.value);
        this.setState({ error : false, loading : true , view : false, tasks : [] });

        await axios.post(window.location.protocol
            + '//'
            + window.location.hostname
            + ":"
            + window.location.port
            + '/api/tasks/update' , {
                userId : localStorage.getItem('token'),
                _id : event.target.value,
                status : 'Work in Progress'
            })
            .then(res => {
                // console.log("SUCCESS");
            })
            .catch(error => {
                this.setState({ loading : false , error : true });
            });

        this.viewTask();
    }

    changeComp = async event => {
        // console.log(event.target.value);
        this.setState({ error : false, loading : true , view : false, tasks : [] });

        await axios.post(window.location.protocol
            + '//'
            + window.location.hostname
            + ":"
            + window.location.port
            + '/api/tasks/update' , {
                userId : localStorage.getItem('token'),
                _id : event.target.value,
                status : 'Completed'
            })
            .then(res => {
                // console.log("SUCCESS");
            })
            .catch(error => {
                this.setState({ loading : false , error : true });
            });

        this.viewTask();
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'))
        if(!user){
            this.setState({ logout : true });
        }else{
            this.setState({ user : user });
        }

        this.viewTask();
    }

    
    render(){

        let tasks;
        if(this.state.tasks){
            tasks = this.state.tasks.map((Task) => {
                // console.log(Task.endTime);
            return (
                <div className="task">
                    {/* {Task.status === "New Task" ? <div >{Task.typeTask} - {Task.description}</div> : ''}
                    {Task.status === "Work in progress" ? <div >{Task.typeTask} - {Task.description}</div> : ''} */}

                    {Task.status === "New Task" ? 
                        <div className='navbar-mini'>
                            <div className="username-mini">{Task.typeTask} - {Task.description}</div>
                            <Button className="task-button" onClick={this.changeWork} value={Task._id}>Work in Progress ?</Button>
                            <Button className="task-button" onClick={this.changeComp} value={Task._id}>Completed ?</Button>
                        </div> 
                        : ''}
                    {Task.status === "Work in Progress" ? 
                        <div className='navbar-mini'>
                            <div className="username-mini">{Task.typeTask} - {Task.description}</div>
                            <Button className="task-button" onClick={this.changeComp} value={Task._id}>Completed ?</Button>
                        </div>
                        : ''}

                    {Task.status === "Completed" ?
                        <div className='navbar-mini'>
                            <div className="username-mini">{Task.typeTask} - {Task.description}</div>
                        </div>
                        : ''}
                    
                <div className="taskDetails">
                  <div>Created at : {Task.startTime}</div>
                  <div>Expected End : {Task.endTime}</div>
                  <div>Status : {Task.status}</div>
                </div>
                <div className="taskDetailsComments">
                  <div>Comments : {Task.comments}</div>
                </div>
                <div className="taskMenu">
                    <Button className="button-delete" onClick={this.deleteTask} value={Task._id}>Delete</Button>
                </div>
              </div>
            );
            });
        }

        // console.log(tasks.length);
        return(
            <div>
                <Navigation />
                <div className='AddTask'>
                    <br />
                    <h3>View Task -</h3>

                    <label className="label">Choose Priority :  </label>
                    <select onChange={this.updateTypeTask} value={this.state.typeTask} className="dropdown">
                        <option selected value="">All</option>
                        <option value="Personal">Personal</option>
                        <option value="Work">Work</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Others">Others</option>
                    </select>

                    <label className="label">Choose Status :  </label>
                    <select onChange={this.updateStatus} value={this.state.status} className="dropdown">
                        <option selected value="">All</option>
                        <option value="New Task">New Task</option>
                        <option value="Work in Progress">Work in Progress</option>
                        <option value="Completed">Completed</option>
                    </select>

                    <Button className="button-view" onClick={this.viewTask}>View</Button>
                </div>
                {this.state.view ? <div>{tasks.length ? tasks : <h1 style={{color: "#000000"}}>No Task Added !!</h1> }</div> : '' }
                {this.state.loading ? <h1 style={{color: "#000000"}}>Loading ...</h1> : ''}
            </div>
        );
    }
};

export default ViewTask;