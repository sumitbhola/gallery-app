import React, { Component } from 'react'
import '../App.css';
import {Link} from 'react-router-dom';
import { CommonService } from '../service/commonService';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, Container } from '@material-ui/core';
import Navbar from './Navbar/Navbar';
import Image from 'material-ui-image';
import delFavoriteIcon from '../Icons/delFavorite.png'

const commonService = new CommonService();
const useStyles = {
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: '5px',
    },
  };
export default class Favorite extends Component{
    
    constructor(props){
        super(props);
        this.state={
            loading:true,
            page:1,
            imageDetailsList:[]
        }
    }
    delFav=(id)=>{
        console.log(id);
        commonService.deleteFavoriteImageDetails(localStorage.getItem('userId'),id,localStorage.getItem('token')).then(res=>{
            console.log(res);
            commonService.getFavoriteImageDetails(localStorage.getItem('userId'),localStorage.getItem('token')).then(response=>{
                console.log(response.data);
                this.setState({
                    imageDetailsList:response.data.docData,
                    loading:false
                })
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err);
        })
    }
  
    componentDidMount(){
        if(localStorage.getItem('token')){

        
        commonService.getFavoriteImageDetails(localStorage.getItem('userId'),localStorage.getItem('token')).then(response=>{
            console.log(response.data);
            this.setState({
                imageDetailsList:response.data.docData,
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
                    
                        <Grid item xs={12} md={3} lg={4} className='size'>
                        
                        <Image src={image.download_url} />
                   
                        <button  className="fav-btn"  ><img src={delFavoriteIcon} name={image._id} onClick={
                            (e)=>{
                                this.delFav(e.target.name)
                            }
                        } className='icn'></img></button>
                        </Grid>
                       
                    
                       
                    )
                })}
                </Grid>
                </div>)}
                
                </div>
        
                
                )
    }

}

