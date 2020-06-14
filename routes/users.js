var express = require('express');
var router = express.Router();
var Users = require('../model/users');
var Item = require('../model/item');
var Booked = require('../model/booked');
const multer = require('multer');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

///multer setup 2:///////////////////////
const config = multer.diskStorage({ 
  destination: function (req, file, cb) {
      cb(null, './uploads')
  }, 
  filename: function(req, file, next){
      console.log("here is log ", file);
      let ext = file.originalname.substring(file.originalname.lastIndexOf("."));
      
      next(null, Date.now()  + ext);
  }
});

const upload = multer({ storage: config })
///multer setup 2:///////////////////////

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json({error : 0, message : "Success calling"})
});

// for email
router.post('/login', (req,res) => {
	
  email = req.body.email;
  password = req.body.password;

	Users.find({email : email, password : password}, (err, data)=>{
		
		if(err){
			res.json({error : true, message : "Something went wrong"})
		}
		else{
			if(data.length == 1){
				let mdata = data[0];

				res.json({error : false, message : "Success", data : data[0]})
			}
			else{
				res.json({error : true, message : "User not found", data : {}})
			}
			
		}
	})
})

// for registration
router.post('/register', (req, res)=>{
	name = req.body.name;
	email = req.body.email;
	mobile = req.body.mobile;
	password = req.body.password;
	address = req.body.address;
	
	Users.find({email : email, mobile : mobile}, (err, data)=>{
		
		if(err){
			res.json({error : true, message : "Something went wrong"})
		}
		else{
			if(data.length == 0){
				
				user = new Users({
					name : name,
					email : email,
					mobile : mobile,
          password : password,
          address : address
				})
				
				user.save((err,userSaved) => {
					if(err){
						if(err.message.lastIndexOf('email_1') != -1){
							message = "Email Id already exist"
						}
						else if(err.message.lastIndexOf('mobile_1') != -1){
							message = "Mobile number already exist"
						}
						res.json({error : true, message : message})
					}
					else{
						res.json({error : false, message : "Success", data : user })
					}
				})
			}
			else{
				res.json({error : true, message : "User already exist", data : {}})
			}
			
		}
	})
	
})

router.post('/addItem', upload.single('image'), (req, res)=>{
	image = req.body.name;
	name = req.body.name;
	description = req.body.description;
	price = req.body.password;
  size = req.body.size;


  if(req.file){
    imegname = req.file.filename
  }
  else{
    imegname = "";
  }
		
  item = new Item({
    name : name,
    description : description,
    price : price,
    size: size,
    image : imegname,
  })
  
  item.save((err,data) => {
    if(err){
      res.json({error : true, message : "Failed", data : {}})
    }
    else{
      res.json({error : false, message : "Success", data : item })
    }
  })
})

router.post('/listItems', (req, res)=>{
  Item.find({}, (err,data)=>{
    if(err){
      res.json({error : true, message : "Something went wrong"});
    }
    else{
      res.json({error : false, message : "Success", data : data});
    }
  })
})

router.post('/addToBook', (req, res)=>{
  user_id = ObjectId(req.body.user_id);
  product_id = ObjectId(req.body.product_id);
  size = req.body.size;
  price = req.body.price;

  Item.find({_id : product_id}, function(err, data){
    if(err){
      res.json({error : true, message : "Something went wrong"});
    }
    else{
      if(data.length > 0){
        book = new Booked({
          user_id : user_id,
          product_id : product_id,
          name : data[0].name,
          description : data[0].description,
          image : data[0].image,
          size : size,
          price : price,
        })
      
        book.save((err) => {
          if(!err){
            res.json({error : false, message : "Saved"})
          }
          else{
            res.json({error : true, message : "Failed to save"})
          }
        })
      }
    }
  })      
})

router.post('/myList', (req,res) => {
  user_id = ObjectId(req.body.id);

  console.log("user_id ", user_id);

  Booked.find({user_id : user_id}, function(err, data){
    if(err){
      res.json({error : true, message : "Something went wrong"});
    }
    else{
      if(data.length > 0){
        res.json({error : false, message : "Success", data : data});
      }
      else{
        res.json({error : true, message : "No Product found"});
      }
    }
  })
})

module.exports = router;