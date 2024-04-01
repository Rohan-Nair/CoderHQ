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
    origin: ["http://localhost:5173", "https://coderhq.vercel.app"],
    credentials: true,
}));

// connecting to the database
connect();


// routes
app.use('/api', routes);

// temp
app.use('/uploads', express.static('uploads'));

// this is a test route to check if server is running
app.use('/', async (req, res) => {
    res.json('Hello World');
})


// starting the server
app.listen(4000, () => {
    // test message to check if server is running (to be removed in production)
    console.log('Server is running on port 4000');
});
