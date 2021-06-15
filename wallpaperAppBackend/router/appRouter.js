'use strict';
module.exports = function (app) {

    const user = require('../controller/userController');
    const wallpaper = require('../controller/wallpaperController');
    const auth = require('../middleware/check-auth');
    
    // User Route 
    app.route('/user')
        .post(user.createUser)
    
    // User Login  
    app.route('/userlogin')
        .post(user.loginUser);

    //  Add to  Favorite  
    app.route('/favorite/:id/:imgId')
        .get(auth,user.addFavorite);

    //  Remove From Favorite 
    app.route('/delfavorite/:id/:imgId')
        .delete(auth,user.deleteFavorite);
    
    
       //  Get Wallpaer 
    app.route('/getwallpaper/:page')
        .get(wallpaper.getAllWallpaper);

         // Get  User Favorite  Wall PApers 
    app.route('/getuserwallpaper/:id')
    .get(auth,wallpaper.getUserWallpaper);
     
    // Default Routes  
    app.get('/', function (req, res) {
        return res.send({ error: true, message: 'This is default page' })
    });

    //  Not found error

    app.use((req, res, next) => {
        const error = new Error("Not Found");
        error.status = 404;
        next(error);
    })

    // Internal server error

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        })
    })

}