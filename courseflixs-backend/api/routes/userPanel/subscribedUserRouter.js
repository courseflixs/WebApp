const express = require("express");
const router = express.Router();
var { addSubsUser, retreiveSubsUser } = require('../../controllers/userPanel/subscribedUserController');

router.get('/get-subuser/:id?', retreiveSubsUser);
router.post('/add-subuser', addSubsUser);



module.exports = router;