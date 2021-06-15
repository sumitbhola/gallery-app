'use strict';
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const mongoose = require('mongoose')

//console.log(process.env.JWT_KEY)

exports.createUser = function (req, res) {
    bcrypt.hash(req.body.password, 10).then(encryptedpw => { 
        const user = new User({
            _id: new mongoose.Types.ObjectId, 
            name: req.body.name, 
            email: req.body.email,
            password: encryptedpw  
        })
        user
            .save()
            .then(data => {
                res.status(200).json({
                    messege: "User Created",
                    result: data._id

                })
            }).catch(err => {
                res.status(400).json({
                    messege: "invalid information" + err
                })
            })
    }).catch(err => {
        res.status(400).json({
            messege: "error message" + err
        })
    })
}
exports.loginUser = function (req, res) {
    let tempUser
    User.findOne({ email: req.body.email })
        .then(userData => {
            
            tempUser = userData;
            return bcrypt.compare(req.body.password, userData.password)
        }).then(result => {
            if (!result) {
                res.status(401).json({
                    messege: "Auth Failed" + err
                })
            }
console.log(process.env.JWT_KEY)
            const token = jwt.sign(
                { email: tempUser.email, userId: tempUser._id },
                process.env.JWT_KEY,
                { expiresIn: 36000  } 
            )

            res.status(200).json({
                messege: "Login Sucessful",
                token,
                userId: tempUser._id,
                username:tempUser.name
                
            })

        }).catch(err => {
            res.status(210).json({
                messege: "Invalid User Email and Password" 
            })
        })
}
exports.addFavorite = function (req, res) {
    User.findById(req.params.id)
        .then(data => {
            if (data.favorite.indexOf(req.params.imgId) < 0) {
                data.favorite.push(req.params.imgId)
            } else {
                res.status(200).json({
                    messege: "Already Exists"
                })
            }

            User.findByIdAndUpdate(req.params.id, data)
                .then(docData => {
                    res.status(200).json({
                        messege: "add to favorite"
                    })
                })
        }).catch(err => {
            res.status(404).json({
                messege: "Invalid User" + err
            })
        })
}
exports.deleteFavorite = function (req, res) {
    User.findById(req.params.id)
        .then(data => {
            let index = data.favorite.indexOf(req.params.imgId)
            if (index > -1) {
                data.favorite.splice(index, 1)
            }
            User.findByIdAndUpdate(req.params.id, data)
                .then(docData => {
                    res.status(200).json({
                        messege: "Delete from favorite"
                    })
                })
        }).catch(err => {
            res.status(404).json({
                messege: "Invalid User" + err
            })
        })
}