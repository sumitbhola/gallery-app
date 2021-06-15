const mongoose = require('mongoose');
const wallpaper = mongoose.Schema({
    id: { type: String },
    author: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    url: { type: String, required: true },
    download_url: { type: String, required: true },
})

module.exports = mongoose.model('wallpapers',wallpaper)