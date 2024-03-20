import express from 'express';
import cors from 'cors';
import { connect } from './dbConfig/dbConfig';
import cookieParser from 'cookie-parser';
require('dotenv').config()


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
}));
connect();


const routes = require('./routes/routes');
app.use('/api', routes);


app.get('/api', (req, res) => {
    res.send('Hello World');
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
