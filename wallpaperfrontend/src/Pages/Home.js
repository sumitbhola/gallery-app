import React, { Component } from 'react'
import '../App.css';
import {Link} from 'react-router-dom';
import { CommonService } from '../service/commonService';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import favoriteIcon from '../Icons/favorite.png'
import Grid from '@material-ui/core/Grid';
import { Button, Container } from '@material-ui/core';
import Navbar from './Navbar/Navbar';
import Image from 'material-ui-image';


const commonService = new CommonService();
const useStyles = {
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: '5px',
    },
  };
export default class Home extends Component{
    
    constructor(props){
        super(props);
        this.state={
            loading:true,
            page:1,
            imageDetailsList:[]
        }
    }
    addToFav=(id)=>{
        console.log(id);
        commonService.addToFavoriteImageDetails(localStorage.getItem('userId'),id,localStorage.getItem('token')).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }
     loadMoreImage =()=>{
        commonService.getImageDetails(++this.state.page).then(response=>{
            //let tempImage = this.state.imageDetailsList;
            response.data.map(data=>{
                //this.state.imageDetailsList.push(data)
                this.setState({
                    imageDetailsList:[...this.state.imageDetailsList,data]
                })
            })
            //this.setState({
                //imageDetailsList:this.state.imageDetailsList
                //imageDetailsList:[...this.state.imageDetailsList]
           // })
        }).catch(err=>{
            console.log(err);
        })
    }
    componentDidMount(){
        if(localStorage.getItem('token')){

        
        commonService.getImageDetails(this.state.page).then(response=>{
            console.log(response.data);
            this.setState({
                imageDetailsList:response.data,
                loading:false
            })
        }).catch(err=>{
            console.log(err)
        })
    }else{
        window.location.href = "/login"
    }
    }

    render(){
        const  { imageDetailsList } = this.state
       
       
        return(
            <div>
            <Navbar/>
            {this.state.loading ? (<div>Loading...</div>) : (
                
                <div>
                <Grid container spacing={3}>
               
                {imageDetailsList.map(image=>{
                    return(
                        
                        <Grid item xs={12} md={3} lg={4}  >
                        
                        <Image src={image.download_url} />
                        <button  className="fav-btn"  ><img src={favoriteIcon} name={image._id} onClick={
                            (e)=>{
                                this.addToFav(e.target.name)
                            }
                        } className='icn'></img></button>
                        
                        </Grid>
                       
                    )
                })}
                </Grid>
                </div>)}
                
                <Button  onClick={this.loadMoreImage} variant= "contained" color= "primary">
                Load More 
                </Button>
                </div>
        
                
                )
    }

}

