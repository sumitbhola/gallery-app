import React, { Component } from 'react'
import { TextField, Button, Divider } from '@material-ui/core';
import '../App.css';
import { Link } from 'react-router-dom';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutLineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { CommonService } from '../service/commonService';

const commonService = new CommonService();
class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    
    onSubmit() {
        const { email,name,password } = this.state
        let data = {email,name,password}
        console.log(data);
        commonService.register(data).then(response => {
            console.log(response);
          
            window.location.href = "/login"
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        if(localStorage.getItem('token')){
            window.location.href='/home'
        }
        return (
            
            <div className='bb'>
                <div className="icon">
                    <div className="icon_class">
                        <PersonAddIcon fontSize="large" />
                    </div>
                    <div className="text">Sign Up</div>
                </div>

                <div className="row m-2">
                    <TextField id="name" className="p-2" type="text"
                        onChange={(e) => { this.setState({ name: e.target.value }) }}
                        variant="outlined" label="Full Name" fullWidth />
                </div>

                <div className="row m-2">
                    <TextField id="email" className="p-2" type="text"
                        onChange={(e) => { this.setState({ email: e.target.value }) }}
                        variant="outlined" label="Email" fullWidth />

                    <TextField id="password" className="p-2" type="password"
                        onChange={(e) => { this.setState({ password: e.target.value }) }}
                        variant="outlined" label="Password" fullWidth />

                    <FormControlLabel
                        control={
                            <CheckBox
                                icon={<CheckBoxOutLineBlankIcon fontSize="small" />}
                                CheckedIcon={<CheckBoxIcon fontSize="small" />}
                                name="Checked1"
                            />
                        }
                        label="I agree to all terms and conditions."
                    />
                    <Button variant="contained" color="primary" fullWidth
                        onClick={this.onSubmit}
                    >Create Account</Button>
                </div>

                <Divider variant="middle" />
                <p className="text-center">
                    <Link to="/login" className="text-black-50">
                        <h5>Already have an Account?</h5>
                    </Link>
                </p>
            </div>
        )

    }
}

export default Signup;
