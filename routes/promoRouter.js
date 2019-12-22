
const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());
// const dishRouterId = express.Router();

// dishRouterId.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotions to you!');
})
.post((req, res, next) => {
    res.end('Will add the promotions: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});
promoRouter.route('/:promoId').all((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	next();
}).get((req, res, next) => {
	res.end('Will send the promotion to you! ' + req.params.promoId);
}).post((req, res, next) => {
	res.statusCode = 403;
	res.end('POST operation is not supported');
}).put((req, res, next) => {
	res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
	
}).delete((req, res, next) => {
	res.end('Deleting the promotion' + req.params.promoId);
});


module.exports = promoRouter;
// module.exports = dishRouterId;