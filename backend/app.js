const express = require('express');
const cors = require('cors');
const notesRouter = require('./routes/notesRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/notes', notesRouter);

module.exports = app;
