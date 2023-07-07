const express = require("express");
const router = express.Router();
var crypto = require('crypto');
const multer = require('multer');
const fs = require('fs')
var path = require('path')
var { retreiveProduct, addProduct, updatingProduct, deletingProduct,updatingLockUnlockStatus } = require('../../controllers/adminPanel/productController');
var pathToCreate = "./public/images/products/";
//image upload code
var Storage = multer.diskStorage({
    destination: async function (req, files, cb) {
        console.log("Files From Disk :  ");
        // var proCat = req.body.catName.split(" ")[0]?req.body.catName.split(" ")[0]:"defaultCategory";
        await fs.mkdir(pathToCreate + "/", { recursive: true }, (err) => {
            cb(null, pathToCreate + "/");
        });
    },
    filename: (req, files, cb) => {
        console.log("uploader")
        console.log(req.body)
        if (req.body.updateMainImg && files.fieldname == 'proMainImg') {
            console.log("pro main image")
            fs.unlinkSync('./public/images/products/' + req.body.updateMainImg, (error) => {
                if (error) {
                    console.log(error);
                }

            });
            cb(null, req.body.updateMainImg.toString().split('.')[0] + path.extname(files.originalname));
        }
        else if (req.body.updateGifImg && files.fieldname == 'gifImage') {
            console.log('gif image')
            fs.unlinkSync('./public/images/products/' + req.body.updateGifImg, (error) => {
                if (error) {
                    console.log(error);
                }

            });
            cb(null, req.body.updateGifImg.toString().split('.')[0] + path.extname(files.originalname));

        }

        else
            cb(null, "product" + "_" + crypto.randomBytes(5).toString('hex') + path.extname(files.originalname));
    },
});

var upload = multer({
    storage: Storage,
    fileFilter: function (req, files, callback) {
        var ext = path.extname(files.originalname);
        var extLower = ext.toLowerCase();
        if (extLower == '.jpeg' || extLower == '.png' || extLower == '.jpg') {
            callback(null, true)
        } else {
            callback({
                message: 'Invalid file Type. Only jpg, png and jpeg are allowed.'
            }, false);

        }
    },

}).fields([{ name: "proMainImg", maxCount: 1 },
{ name: "gifImage", maxCount: 1 }]);

router.get('/get-product/:id?', retreiveProduct);
router.post('/add-product', upload, addProduct);
router.put('/update-product/:id', upload, updatingProduct);
router.delete('/delete-product/:id', deletingProduct)
router.get('/lock-product/:id/:lock_status',updatingLockUnlockStatus);

module.exports = router;
