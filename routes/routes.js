const express = require('express')
const checkRequiredFields = require('../middlewares/checkRequiredFields');
const dogController = require('../controllers/dogController');
const router = express.Router();

//Routes 
router.use('/ping', dogController.home);
router
    .route('/dogs')
    .get(dogController.getDogs)
    .post(checkRequiredFields(['name', 'color', 'tail_length', 'weight']), dogController.createDogs);

// export
module.exports = { router }