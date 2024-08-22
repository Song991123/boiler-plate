import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';
import config from './config/key.js';

const app = express();
const port = 5000;


mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'));
// 회원가입 기능
app.post('/register', async (req, res) => {
    const user = new User(req.body);
    try {
        const userInfo = await user.save();
        res.status(200).json({ success: true, userInfo });
    } catch (err) {
        res.json({ success: false, err });
    }
});

app.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}/`));