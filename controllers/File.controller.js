const db = require('../config/db');
var multer = require('multer')
const express = require('express');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
})
  
  
var upload = multer({ storage: storage }).single('file')

exports.UploadImage = (req, res) => {
	
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
   return res.status(200).send(req.file)

 })
};



 