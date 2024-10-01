const User = require("../models/User");
const mongoose = require("mongoose");

exports.sendNotificationTestApp = async (req, res) => {
    const messages = await req.flash('info');
    const locals = {
        title: 'Nodejs',
        decsription: 'Free Nodejs User Management System',
    }
    try {
        // res.render("users", locals);
        res.status(200).json({ success: true, message: "Notification sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to send notification" });
    }
};


exports.postNotification = async (req, res) => {
    
    try {

        const count = await User.countDocuments();
        const newNotification = new User({
            notification: `Notification sent successfully ${count + 1}`,
            isCheck: false,
        });

        console.log("newNotification", newNotification)

        // await newNotification.save();
        await User.create(newNotification);
        res.status(200).json({ success: true, message: `Notification sent successfully ${count + 1}`, isCheck: false });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to send notification" });
    }
};

exports.putNotification = async (req, res) => {
    try {
        await User.updateOne({ _id: req.params.id }, { isCheck: true });
        res.status(200).json({ success: true, message: "Update success" });
    } catch (error) {
        console.log("Error in updateNotification:", error);
        res.status(500).json({ success: false, message: "Failed to send notification" });
    }
}


exports.getNotification = async (req, res) => {
    try {
        const users = await User.find();
        const isRead = users.every(user => user.isCheck);
        res.status(200).json({ success: true, data: users, isRead });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to get notification" });
    }
}

exports.deleteNotification = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true, message: "Delete success" });
    } catch (error) {
        console.log('Error in deleteNotification:', error);
        res.status(500).json({ success: false, message: "Failed to delete notification" });
    }
}

exports.userPage = async (req, res) => {
    const locals = {
        title: 'Nodejs',
        decsription: 'Free Nodejs User Management System',
    }
    try {
        //render phải là tên file được đặt trong views.
        res.render("users", locals);
        // res.json({ locals });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};