const path = require('path');
// const express = require("express");
// const bodyParser = require("body-parser");

const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const sharp = require('sharp');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("../models/Product_model");
const router = require("express").Router();
const axios = require("axios");

const mongoURI = "mongodb://localhost/EHF";
const conn = mongoose.createConnection(mongoURI);

let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
      // bucketName should match this collection name
  gfs.collection('uploads');
})

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata: {
            productName: file.originalname.slice(0,-4),
            ownBy: "Elegant Home Fashions"
          }
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage }).single('file');


// Upload image
router.post('/api/upload/', upload, (req, res) => {
  console.log("<<=======================>>");
  console.log(req.file)
  console.log("<<=======================>>");
  console.log(req.file.filename)

  let newProductModel = new Product({images: req.file.id});

  newProductModel.save()
    .then(data => {console.log("image ID saved")})

  return res.json({upload: req.file.filename})
  // axios.put('/api/products' + id, {"images" : res.req.file.id});
})

// Get all getImages
router.get('/api/files', (req, res) =>{
  gfs.files.find().toArray((err, files)=>{
    // Check if files
    if(!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }
    //Files exist
    return res.json(files);
  });
});

//----find last image by ID
router.get('/api/fileid', (req, res, next) =>{
  gfs.files.find().limit(1).sort({_id:-1}).toArray((err, files)=>{
    return res.json(files);
  }).catch(combineReducers)
});

// Delete image by ID
router.delete('/api/deletefile/:id', (req, res, next)=>{
  gfs.files.deleteOne({ _id: new mongodb.ObjectId(req.params.id)}, (err, file) => {
    return res.json({file: "this file is deleted."})
  })
})

// Find one by ID
router.get('/api/findinfo/:id', (req, res, next)=>{
  gfs.files.findOne({_id: new mongodb.ObjectID(req.params.id)}, (err, file) => {
    console.log("<================== some info ========================>")
    return res.json(file);
  })
});

// convert small image by sharp
router.get('/api/imagesm/:filename', (req, res) =>{
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    if(!file || file.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }
    // Check if image
    if(file.contentType === 'image/png' || file.contentType === 'image/jpeg' || file.contentType === 'image/gif'){
      // Read output to browser
      var transformer = sharp()
        .resize(300)
        .on('info', function(info) { });
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(transformer).pipe(res);
      } else {
      res.status(404).json({
        err: 'Not an image'
      })
    }
  })
});

// @route GET /image/:filename
// @desc Display image
  router.get('/api/image/:filename', (req, res, next) =>{
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
      if(!file || file.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
      // Check if image
      if(file.contentType === 'image/png' || file.contentType === 'image/jpeg'){
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
        } else {
        res.status(404).json({
          err: 'Not an image'
        })
      }
    })
  });


  // convert small image by sharp
  router.get('/api/imagesm/:filename', (req, res) =>{
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
      if(!file || file.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
      // Check if image
      if(file.contentType === 'image/png' || file.contentType === 'image/jpeg' || file.contentType === 'image/gif'){
        // Read output to browser
        var transformer = sharp()
          .resize(300)
          .on('info', function(info) { });
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(transformer).pipe(res);
        } else {
        res.status(404).json({
          err: 'Not an image'
        })
      }
    })
  });


  router.get('/api/images/:metadata', (req, res) =>{
      console.log(req.params.metadata);
    gfs.files.findOne({metadata: req.params.metadata}, (err, file) => {
      console.log(file);
      if(file.contentType === 'image/jpeg' || file.contentType === 'img/png'){
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        })
      }
    })
  });

module.exports = router;
