import {HelpApi} from './help/helpApi';

const api = new HelpApi();
const baseURL = "http://127.0.0.1:5000/";
export class CommonService { 
    constructor(){}
    register(data){
        let url = `${baseURL}user`;
        return api.post(url,data);
    }
    login(data){
        let url = `${baseURL}userlogin`;
        return api.post(url,data);
    }
    getImageDetails(pageNumber){
        let url = `${baseURL}getwallpaper/${pageNumber}`;
        return api.get(url);
    }
    getFavoriteImageDetails(userId,token){
        let url = `${baseURL}getuserwallpaper/${userId}`;
        return api.getById(url,token);
    }
    addToFavoriteImageDetails(userId,imageId,token){
        let url = `${baseURL}favorite/${userId}/${imageId}`;
        return api.getById(url,token);
    }
    deleteFavoriteImageDetails(userId,imageId,token){
        let url = `${baseURL}delfavorite/${userId}/${imageId}`;
        return api.delete(url,token);
    }

}