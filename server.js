import express from "express";
import fetch from "node-fetch";


const app = express();
app.use(express.json());


const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const SECRET_KEY = process.env.SECRET_KEY;


// Root route for health check
app.get("/", (req, res) => {
res.send("✅ Telegram Server is Running!");
});


// Send message API
app.post("/send-message", async (req, res) => {
const { text, secretKey } = req.body;


if (secretKey !== SECRET_KEY) {
return res.status(403).json({ error: "Invalid secret key" });
}


try {
const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ chat_id: CHAT_ID, text }),
});


const data = await response.json();
res.json(data);
} catch (error) {
console.error("Error sending message:", error);
res.status(500).json({ error: "Failed to send message" });
}
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
