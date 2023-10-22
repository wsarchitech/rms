const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/rms', { useNewUrlParser: true, useUnifiedTopology: true });

app.use((req, res, next) => {

  const subdomain = extractSubdomain(req.hostname);
  req.tenantId = subdomain;

  console.log('req.tenantId', req.tenantId);
  next();
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function extractSubdomain(hostname) {
  const parts = hostname.split('.');
  return parts.length >= 2 ? parts[0] : 'default';
}
