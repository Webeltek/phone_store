const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { phoneController, messageController } = require('../controllers');

// middleware that is specific to this router

router.get('/', phoneController.getPhones);
router.get('/owned', auth(), phoneController.getOwnedPhones);
router.get('/ordered', auth(), phoneController.getOrderedPhones);
router.get('/latest', phoneController.getLatestPhones);
router.post('/', auth(), phoneController.createPhone);
router.get('/:phoneId', phoneController.getPhone);
router.put('/:phoneId',auth(), phoneController.editPhone)
router.put('/:phoneId/order',auth(), phoneController.order)
router.delete('/:phoneId',auth(), phoneController.deletePhone)


// router.get('/my-trips/:id/reservations', auth(), phoneController.getReservations);

module.exports = router