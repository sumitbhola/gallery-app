import axios from 'axios'
export class HelpApi {
    constructor(){}
    get(url){
        return axios.get(url)
    }
    post(url,data){
        return axios.post(url,data);
    }
    getById(url,token){
        return axios.get(url,{headers:{
            Authorization: "Bearer "+token
        }})
    }
    delete(url,token){
        return axios.delete(url,{headers:{
            Authorization: "Bearer "+token
        }})
    }
}