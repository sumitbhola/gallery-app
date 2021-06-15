import React, { Component } from 'react'
import {TextField, Button, Divider} from '@material-ui/core';
import '../App.css';
import {Link, Redirect} from 'react-router-dom';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PersonIcon from '@material-ui/icons/Person';
import CheckBoxOutLineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { CommonService } from '../service/commonService';

const commonService = new CommonService();
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onSubmit() {
        const { email,password } = this.state
        let data = {email,password}
        console.log(data);
        commonService.login(data).then(response => {
            console.log(response);
          if(response.status==200){
              localStorage.setItem('username',response.data.username);
              localStorage.setItem('userId',response.data.userId);
              localStorage.setItem('token',response.data.token);

              window.location.href = "/home"
          }
     
        }).catch(err => {
            console.log(err);
        })
    }
render(){
    if(localStorage.getItem('token')){
        window.location.href='/home'
        
    }
    return (
        <div className='bb'>
            <div className= "icon">
                <div className= "icon_class">
                    <PersonIcon fontSize="large" />
                </div>
                <div className= "text">Log in</div>
            </div>

            <div className= "row m-2">
                <TextField id= "email" className="p-2"
                onChange={(e) => { this.setState({ email: e.target.value }) }}
                type= "text" variant= "outlined" label= "Email" fullWidth/>

                <TextField id= "password" className="p-2" 
                onChange={(e) => { this.setState({ password: e.target.value }) }}
                type= "password" variant= "outlined" label= "Password" fullWidth/>

                <FormControlLabel 
                    control={
                    <CheckBox
                        icon= {<CheckBoxOutLineBlankIcon fontSize="small" />}
                        CheckedIcon= {<CheckBoxIcon fontSize="small" />}
                        name="Checked1"
                    />
                    }
                    label="Remember me"
                />
                <Button variant= "contained" color= "primary" fullWidth
                onClick={this.onSubmit}>Log in</Button>

            </div>

            <Divider variant="middle"/>
            <p className="text-center">
                <Link to="/Signup" className="text-black-50">
                    <h5>Create Account</h5>
                </Link>
            </p>
        </div>
    )
}
}
export default Login;
