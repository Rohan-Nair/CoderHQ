import express from 'express';
import cors from 'cors';
import { connect } from './dbConfig/dbConfig';
import cookieParser from 'cookie-parser';
import routes from './routes/routes';
require('dotenv').config()

// creating the app
const app = express();


// parsing json middleware
app.use(express.json());

// parsing cookies middleware
app.use(cookieParser());

// cors middleware (need to change origin to frontend url in production)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// connecting to the database
connect();

// app.use('/', async (req, res) => {
//     res.json('Hello World');
// })

// routes
app.use('/api', routes);

// temp
app.use('/uploads', express.static('uploads'));

// test route to be removed in production
app.get('/api', (req, res) => {
    res.send('Hello yadav ji');
});

// starting the server
app.listen(4000, () => {
    // test message to check if server is running (to be removed in production)
    console.log('Server is running on port 4000');
});
