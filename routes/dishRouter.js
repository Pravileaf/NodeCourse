const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());
// const dishRouterId = express.Router();

// dishRouterId.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});
dishRouter.route('/:dishId').all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
}).get((req, res, next) => {
	res.end('Will send the dish to you! ' + req.params.dishId);
}).post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation is not supported');
}).put((req, res, next) => {
	res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
	
}).delete((req, res, next) => {
	res.end('Deleting the dish ' + req.params.dishId);
});

module.exports = dishRouter;
// module.exports = dishRouterId;