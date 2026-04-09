const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/'))); // Serve static files from root

// Simple persistence (JSON file)
const DATA_FILE = path.join(__dirname, 'db.json');

// Initial Data Structure
const initializeDb = () => {
    if (!fs.existsSync(DATA_FILE)) {
        const initialData = {
            users: [],
            logs: []
        };
        fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    }
};

const readDb = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const writeDb = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

initializeDb();

// --- Auth Routes ---
app.post('/api/auth/login', (req, res) => {
    const { username } = req.body;
    const db = readDb();
    const user = db.users.find(u => u.username.toLowerCase() === username.toLowerCase());
    
    if (user) {
        res.json({ success: true, userExists: true, user });
    } else {
        res.json({ success: true, userExists: false, error: 'User not found' });
    }
});

app.post('/api/auth/signup', (req, res) => {
    const { username } = req.body;
    const db = readDb();
    
    // Check if user already exists
    if (db.users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
        return res.json({ success: false, error: 'Username already taken' });
    }
    
    const newUser = { ...req.body, id: Date.now() };
    db.users.push(newUser);
    writeDb(db);
    
    res.json({ success: true, user: newUser });
});

// --- Health Logs Routes ---
app.get('/api/logs/:username', (req, res) => {
    const { username } = req.params;
    const db = readDb();
    const userLogs = db.logs.filter(log => log.username === username);
    res.json(userLogs);
});

app.post('/api/logs', (req, res) => {
    const log = { ...req.body, id: Date.now(), timestamp: new Date().toISOString() };
    const db = readDb();
    db.logs.push(log);
    writeDb(db);
    res.json({ success: true, log });
});

// --- Chatbot Route ---
// Following strict behavioral rules and mandatory format
const botKnowledge = {
    periods: {
        title: 'Menstrual Health: Periods',
        causes: 'Natural hormonal changes.',
        symptoms: 'Cycle: 21–35 days. Flow: 3–7 days.',
        tryThis: 'Tracking your cycle.',
        diet: 'Iron-rich foods and hydration.',
        seekHelp: 'If cycle <21 or >35 days.'
    },
    cramp: {
        title: 'Period Cramps',
        causes: 'Uterine contractions (prostaglandins).',
        symptoms: 'Lower abdomen/back pain.',
        tryThis: 'Heat pad, light exercise.',
        diet: 'Warm foods, avoid junk.',
        seekHelp: 'If pain is severe or persistent.',
        risk: 'Moderate'
    },
    pcos: {
        title: 'PCOS Early Awareness',
        causes: 'Hormonal imbalance and insulin resistance.',
        symptoms: 'Irregular periods, acne, weight gain.',
        tryThis: 'Regular activity, symptom tracking.',
        diet: 'Low-GI diet, healthy proteins.',
        seekHelp: 'Consult a doctor for diagnosis.',
        risk: 'Moderate to High'
    }
    // Shared structure for other categories...
};

function formatBackendResponse(data) {
    return `### ${data.title}\n\n**Possible Causes:**\n${data.causes}\n\n**Common Symptoms:**\n${data.symptoms}\n\n**What You Can Try:**\n${data.tryThis}\n\n**Lifestyle & Diet Tips:**\n${data.diet}\n\n**When to Seek Help:**\n${data.seekHelp}\n\n${data.risk ? `**🚨 RISK AWARENESS:** ${data.risk}\n\n` : ''}*Note: This information is for awareness only. If symptoms persist, consider consulting a doctor.*`;
}

app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    const msg = message.toLowerCase();
    
    let result = null;
    if (msg.includes('period')) result = botKnowledge.periods;
    else if (msg.includes('cramp')) result = botKnowledge.cramp;
    else if (msg.includes('pcos')) result = botKnowledge.pcos;

    if (result) {
        res.json({ response: formatBackendResponse(result) });
    } else {
        res.json({ 
            response: "### 🌸 How can I help?\n\nI'm here to support you with structured health guidance! Ask me about periods, cramps, or PCOS." 
        });
    }
});

// Fallback to index.html for SPA routing (Catch-all)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Harmo Mind Server running at http://localhost:${PORT}`);
});
