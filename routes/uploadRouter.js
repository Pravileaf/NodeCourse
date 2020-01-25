const express=require('express');
const bodyParser=require('body-parser');
const authenticate=require('../authenticate');
const multer=require('multer');
const cors=require('./cors');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
cb(null,'publiic/images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.orginalname);

    }
});

const imageFileFilter=(req,file,cb)=>{
    if(!file.orginalname.match(/\.(jpeg|png|jpg|pdf)$/))
    {
       return cb(new Error('you can upload only image files!'),false);
    }
    cb(null,true);

};


const upload=multer({storage:storage,fileFilter:imageFileFilter});
const uploadRouter=express.Router();

uploadRouter.use(bodyParser.json());
uploadRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('Get operation not supported on /imageUpload');

})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,upload.single('imageFile'),(req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(req.file);
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>
{
    res.statusCode=403;
    res.end("Delete operation not supported on /imageUpload");
});
module.exports=uploadRouter;