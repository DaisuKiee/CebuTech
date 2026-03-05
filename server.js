const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'build')));

// API routes (if needed in the future)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CebuTech API is running' });
});

// Serve React app for all other routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✓ Server is running on port ${PORT}`);
  console.log(`✓ Visit: http://localhost:${PORT}`);
  console.log(`✓ API Health: http://localhost:${PORT}/api/health`);
});
