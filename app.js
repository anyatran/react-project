const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const port = 8000;

require('node-jsx').install();

// Middleware
app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Fire it up
const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`App server is running at http://localhost:${app.get('port')}`); // eslint-disable-line
});
