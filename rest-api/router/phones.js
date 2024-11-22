const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { phoneController, messageController } = require('../controllers');

// middleware that is specific to this router

router.get('/', phoneController.getPhones);
router.get('/latest', phoneController.getLatestPhones);
router.post('/', auth(), phoneController.createPhone);
router.get('/:phoneId', phoneController.getPhone);


router.post('/:phoneId/messages', auth(), messageController.createMessage);
router.put('/:phoneId/messages/:messageId', auth(), messageController.editMessage);
router.delete('/:phoneId/messages/:messageId', auth(), messageController.deleteMessage);

// router.get('/my-trips/:id/reservations', auth(), phoneController.getReservations);

module.exports = router