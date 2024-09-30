const express = require('express');
const axios = require('axios');
const app = express();

// 静的ファイルを提供
app.use(express.static('public'));

// 指定されたURLのソースコードを取得
app.get('/getSource', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URLが指定されていません');
    }

    try {
        const response = await axios.get(url);
        res.send(response.data); // ソースコードをクライアントに返す
    } catch (error) {
        res.status(500).send('ソースコードを取得できませんでした: ' + error.message);
    }
});

// サーバーを起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
