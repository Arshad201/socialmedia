const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const errorMiddleware = require('./middleware/errorMiddleware.js');

const userRoutes = require('./routes/userRoutes.js')
const friendRoutes = require('./routes/friendRoutes.js');
const postRoutes = require('./routes/postRoutes.js');

// app.use(express.static(path.join(__dirname, '../', 'frontend', 'build', 'index.html')));

// app.get('/', (req, res)=>{

//     res.sendFile(path.join(`${__dirname}`, '../', 'frontend', 'build', 'index.html'));

// });

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/v1', userRoutes);
app.use('/api/v1', friendRoutes);
app.use('/api/v2', postRoutes);

app.use(errorMiddleware); 
module.exports = app;