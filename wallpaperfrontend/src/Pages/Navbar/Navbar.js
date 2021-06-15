import { Button } from '@material-ui/core';
import React, { Component } from 'react'
import { MenuItems } from './Menuitems';
import './Navbar.css';

export default class Navbar extends Component{
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }
    handleLogout(){
        localStorage.clear()
        
        window.location.href='/login'
    }

    render(){
        return(
            <nav className='NavbarItems'>
                <h1 className='navbae-logo'>Diatoz<i className="fab fa-react" /></h1>

                <div className='menu-icon' onclick= {this.handleClick}>

                    <i className= {this.state.clicked ? 'fas fa-times' : 'fas fa-bars'} />

                </div>
                <ul className={ this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key = {index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                            )
                    })}
                    <li className='user'> Hi {localStorage.getItem('username')} </li>
                    <li className='logOut'><Button variant="contained" onClick={this.handleLogout} color="secondary"> Logout </Button></li>
                </ul>
            </nav>
        )
    }
}