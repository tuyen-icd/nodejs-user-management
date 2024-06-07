const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/testapp', userController.userPage);

// router.post('/send-notification', userController.sendNotificationTestApp);
router.post('/post-notification', userController.postNotification);

router.get('/get-notification', userController.getNotification);

router.delete('/delete-notification/:id', userController.deleteNotification);
// Export router
module.exports = router;