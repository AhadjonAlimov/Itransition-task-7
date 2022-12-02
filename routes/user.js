const express = require("express");
const router = express.Router();
const { v4 } = require("uuid");
const uuidv4 = v4;
const { StreamChat } = require("stream-chat");


const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const serverClient = new StreamChat.getInstance(api_key, api_secret);

router.post("/login", async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) return res.status(422).json({ error: "Please add username" });
        const { users } = await serverClient.queryUsers({ name: username });

        if (users.length === 0) {
            const userId = uuidv4();
            const token = serverClient.createToken(userId);
            console.log({ token, userId, username });
            res.json({ token, userId, username, });
        } else {
            const token = serverClient.createToken(users[0].id);
            console.log({ 
                token, 
                username,
                userId: users[0].id,
            });
            res.json({
                token,
                username,
                userId: users[0].id,
            });
        }
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;