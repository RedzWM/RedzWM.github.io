// Cập nhật backend/index.js để hỗ trợ conversation và lưu lịch sử vào tệp JSON, thêm bảo vệ UI bằng session login an toàn
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
const ACCESS_PASSWORD = 'LQDA16';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
const HISTORY_FILE = './chat_history.json';

// Thiết lập session login 
app.use(session({
  secret: 'super_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 tiếng
}));

function loadHistory() {
  if (!fs.existsSync(HISTORY_FILE)) return {};
  const data = fs.readFileSync(HISTORY_FILE);
  return JSON.parse(data);
}

function saveHistory(history) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
}

// Route login UI
app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === ACCESS_PASSWORD) {
    req.session.authenticated = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Sai mật khẩu' });
  }
});

// Middleware bảo vệ UI
app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path === '/login') {
    return next();
  }
  if (req.session.authenticated) {
    return next();
  }
  res.status(401).send('Truy cập bị từ chối. Vui lòng đăng nhập.');
});

// Phục vụ frontend
app.use(express.static(path.join(__dirname, '../frontend')));

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, sessionId } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Thiếu prompt.' });

    const history = loadHistory();
    const sessionData = history[sessionId] || [];

    const contents = sessionData.map(item => ({ role: item.role, parts: [{ text: item.text }] }));
    contents.push({ role: 'user', parts: [{ text: prompt }] });

    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    const json = await response.json();
    const reply = json?.candidates?.[0]?.content?.parts?.[0]?.text || 'Không có phản hồi.';

    if (!history[sessionId]) history[sessionId] = [];
    history[sessionId].push({ role: 'user', text: prompt });
    history[sessionId].push({ role: 'model', text: reply });
    saveHistory(history);

    res.json({ reply, sessionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server.' });
  }
});

app.get('/api/history/:sessionId', (req, res) => {
  const history = loadHistory();
  const session = history[req.params.sessionId] || [];
  res.json(session);
});

app.listen(3000, () => console.log('Server đang chạy tại http://localhost:3000'));
