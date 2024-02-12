const express = require('express');

const router = express.Router();
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {
  addBlog, retreiveBlog, updatingBlog, deletingBlog, getAllPublicBlog, getTopBlog,
} = require('../../controllers/adminPanel/blogController');

const pathToCreate = './public/images/blogs/';

const Storage = multer.diskStorage({
  async destination(req, files, cb) {
    console.log('Files From Disk :  ');
    // var proCat = req.body.catName.split(" ")[0]?req.body.catName.split(" ")[0]:"defaultCategory";
    await fs.mkdir(`${pathToCreate}/`, { recursive: true }, (err) => {
      cb(null, `${pathToCreate}/`);
    });
  },
  filename: (req, files, cb) => {
    console.log('uploader');
    console.log(req.body);
    if (req.body.updatedBlogImg && files.fieldname == 'blogImage') {
      console.log('pro main image');
      fs.unlinkSync(`./public/images/blogs/${req.body.updatedBlogImg}`, (error) => {
        if (error) {
          console.log(error);
        }
      });
      cb(null, req.body.updatedBlogImg.toString().split('.')[0] + path.extname(files.originalname));
    } else cb(null, 'Blog' + `_${crypto.randomBytes(5).toString('hex')}${path.extname(files.originalname)}`);
  },
});

const upload = multer({
  storage: Storage,
  fileFilter(req, files, callback) {
    const ext = path.extname(files.originalname);
    const extLower = ext.toLowerCase();
    if (extLower == '.jpeg' || extLower == '.png' || extLower == '.jpg') {
      callback(null, true);
    } else {
      callback({
        message: 'Invalid file Type. Only jpg, png and jpeg are allowed.',
      }, false);
    }
  },

}).fields([{ name: 'blogImage', maxCount: 1 }]);

router.get('/get-blog/:id?', retreiveBlog);
router.post('/add-blog', upload, addBlog);
router.put('/update-blog/:id', upload, updatingBlog);
router.delete('/delete-blog/:id', deletingBlog);
router.get('/get-public-blog/:catOrVisiblity', getAllPublicBlog);
router.get('/get-top-blog', getTopBlog);
module.exports = router;
