const express = require("express");
const groupRouter = express.Router();
const GroupMsg = require("../models/GroupMsgModel");

// POST a new message
groupRouter.post("/postMsg", async (req, res) => {
  try {
    const { from_user, room, message } = req.body;

    if (!from_user || !room || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMsg = new GroupMsg({
      from_user,
      room,
      message
    });

    await newMsg.save();

    res.status(201).json({
      message: "Message sent successfully",
      data: newMsg
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all messages for a room
groupRouter.get("/getMsg/:room", async (req, res) => {
  try {
    const { room } = req.params;

    const messages = await GroupMsg.find({ room: room.toLowerCase() }).sort({ date_sent: 1 });

    res.json({
      room,
      messages
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = groupRouter;
