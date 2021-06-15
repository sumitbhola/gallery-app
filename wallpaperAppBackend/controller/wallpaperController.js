'use strict';
const user = require('../model/userModel')
const wallpaper = require('../model/wallpaperModel');
exports.getAllWallpaper = function (req, res) {
  let currentPage = req.params.page; 
  if (!currentPage || currentPage == undefined) {
      currentPage = 1
  }
       wallpaper.find().skip(10 * (currentPage - 1)).limit(10) 
  .then(imageData => {
      res.status(200).json(imageData)
  }).catch(err => {
      res.status(210).json({
          messege: "there is no record" + err
      })
  })
}
exports.getUserWallpaper = function (req, res) {
    user.findById(req.params.id)
      .then(data => {
        wallpaper.find({ _id: { $in: data.favorite } }).exec() 
          .then(docData => {
            res.status(200).json({ docData })
          }).catch(err => {
            res.status(410).json({
              message: "not  able to find wallpaper" + err
            })
          })
      }).catch(err => {
        res.status(404).json({
          message: "invalid User ID" + err
        })
      })
  }