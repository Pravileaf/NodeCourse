const express = require('express');
var authenticate=require('../authenticate');
const bodyParser = require('body-parser');
const Favorite= require('../models/favorite');

const mongoose = require('mongoose');
const cors=require('./cors');




const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
    Favorite.findOne({"user":req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favorite) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
  Favorite.findOne({user:req.user.user._id}) 
  .then((favorite)=>{
      if(favorite){
req.body.forEach((dish)=>{
    if(favorite.dishes.indexOf(dish._id)===-1){
        favorite.dishes.push(dish._id);
    }
});
favorite.save()
.then((f)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(f);
},(err)=>next(err));
      }
  else
    
    
    {
        Favorite.create({user:req.user._id,dishes:req.body})
    .then((favorite) => {
        console.log('Dish Created ', favorite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    }, (err) => next(err))
}
  },(err)=>next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Favorite.findOneAndremove({user:req.user._id})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});
favoriteRouter.route('/:dishId')
.options(cors.cors,(res,req)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next) => {
   res.statusCode=403;
   res.end('GET operation not supported on /favorites/'+req.params.dishId);
})

.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Favourite.findOne({user:req.user._id})
    .then((favdish)=>{
        if (favdish != null) {
            if(favdish.dishes.indexOf(req.params.dishId)===-1){
            favdish.dishes.push(req.params.dishId);
            favdish.save()

        
                .then((favdish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favdish);
                       
            }, (err) => next(err));
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favdish);
        }
    }
    else {
        Favorite.create({ "user": req.user._id, "dishes": [req.params.dishId] })
        .then((favorites) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorites);
        }, (err) => next(err))
    }


    },(err) => next(err))
    .catch((err) => next(err));
})
.put( cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
    
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/'
        + req.params.dishId);    
       
    }
)
.delete( cors.corsWithOptions,authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({user:req.user._id})
    .then((favorite) => {
        
        if (favorite != null) {

            if (favorite.dishes.indexOf(req.params.dishId) !== -1) {
                favorite.dishes = favorite.dishes.filter((d) => d == req.params.dishId);
                favorite.save()
    
        
                .then((favdish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favdish);  
                }, (err) => next(err));
            }

            else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }

        }

        else {

            err = new Error('FavoriteDish not found');
            err.status = 404;
            return next(err);

        }

    }, (err) => next(err))
    .catch((err) => next(err));
});


