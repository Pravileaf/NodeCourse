// {
//     "name": "Weekend Grand Buffet",
//     "image": "images/buffet.png",
//     "label": "New",
//     "price": "19.99",
//     "description": "Featuring . . .",
//     "featured": false
// }
// const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label:
    {
        type:String,
        default:''
    },
    price:
    {
        type: Currency,
        required: true,
        min: 0
        
    },
    description:
    {
        type:String,
        required:true
    },
    featured:
    {
        type:Boolean,
        required:false
    }
},   
 
{timestamps: true}
    

);

var Promotions= mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;