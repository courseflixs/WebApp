const express = require("express");
const router = express.Router();
var crypto = require('crypto');
const multer = require('multer');
const fs = require('fs')
var path = require('path')
var { addTestimonial, retreiveTestimonial, updatingTestimonial, deletingTestimonial } = require('../../controllers/adminPanel/testimonialController');
var pathToCreate = "./public/images/testimonial/";

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
        if (req.body.updatedTestimonialImg && files.fieldname == 'testimonialImage') {
            console.log("pro main image")
            fs.unlinkSync('./public/images/testimonial/' + req.body.updatedTestimonialImg, (error) => {
                if (error) {
                    console.log(error);
                }

            });
            cb(null, req.body.updatedTestimonialImg.toString().split('.')[0] + path.extname(files.originalname));
        }

        else
            cb(null, "Testimonial" + "_" + crypto.randomBytes(5).toString('hex') + path.extname(files.originalname));
    },
});

var upload = multer({
    storage: Storage,
    fileFilter: function (req, files, callback) {
            callback(null, true);        
    },

}).fields([{ name: "testimonialImage", maxCount: 1 }]);


router.get('/get-testimonial/:id?', retreiveTestimonial);
router.post('/add-testimonial', upload, addTestimonial);
router.put('/update-testimonial/:id', upload, updatingTestimonial);
router.delete('/delete-testimonial/:id', deletingTestimonial)

module.exports = router;