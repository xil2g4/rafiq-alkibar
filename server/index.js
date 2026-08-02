const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-ratelimit');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});

app.use('/api/', limiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/user', require('./routes/user'));

app.get('/health', (req, res) => res.json({ status: 'OK' }));

const clientPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientPath));
app.get('*', (req, res) => res.sendFile(path.join(clientPath, 'index.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));