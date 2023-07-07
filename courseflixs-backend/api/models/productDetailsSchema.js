const mongoose = require("mongoose");
var conn = mongoose.Collection;
var producSchema = new mongoose.Schema({
    product_name: {
        type: String,
    },
    category_name:{
            type:String
    },
    file_size: {
        type: String
    },
    original_price: {
        type: Number
    },
    sale_price: {
        type: Number
    },
    main_product_image: {
        type: String
    },
    gif_image:{
        type:String
    },
    sale_page:{
        type:String
    },
    sale_page_link:{
        type:String
    },
    tags:[{
        type:String
    }],
    show_slider:{
        type:String,
    },
    recommended:{
        type:String
    },
    lock_unlock_product:{
        type:String,
        default:"0"
    }

}, { timestamps: true });

var productDetails = mongoose.model('product_details', producSchema);
module.exports = productDetails;