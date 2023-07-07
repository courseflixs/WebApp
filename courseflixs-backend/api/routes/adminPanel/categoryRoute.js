const express = require("express");
const router = express.Router();
var { addCategory, retreiveCategory, updatingCategory, deletingCategory,retreiveTypeCategory } = require('../../controllers/adminPanel/CategoryController');

router.get('/get-category/:id?', retreiveCategory);
router.post('/add-category', addCategory);
router.put('/update-category/:id', updatingCategory);
router.delete('/delete-category/:id', deletingCategory);
router.get('/get-typecat/:typeCat', retreiveTypeCategory);


module.exports = router;