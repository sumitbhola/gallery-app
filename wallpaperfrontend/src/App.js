import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import {Switch, Route} from 'react-router-dom';
import { Container } from '@material-ui/core';
import Favorite from './Pages/Favorite';


function App() {
  return (
    
 
    
    <div className = "app">
    <Switch>
    <Route path = "/home" exact component = {Home}/>
    <Route path = "/signup" exact component = {Signup}/>
    <Route path = "/login" exact component = {Login}/>
    <Route path = "/" exact component = {Login}/> 
    <Route path = "/favorite" exact component = {Favorite}/>
    </Switch>
    </div>
   
   
  );
}

export default App;
