import express from 'express';
const app = express();
import cors from 'cors';

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
));

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.listen(4000, () => {
    console.log('Server is running on port 3000');
});
