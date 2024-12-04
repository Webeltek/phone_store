const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { messageController } = require('../controllers');

// middleware that is specific to this router

router.get('/', messageController.getLatestMessages);
router.get('/:phoneId', messageController.getMessages);
router.post('/:phoneId', auth(), messageController.createMessage);

router.put('/:phoneId/:messageId', auth(), messageController.editMessage);
router.delete('/:phoneId/:messageId', auth(), messageController.deleteMessage);

module.exports = router