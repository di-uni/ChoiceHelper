import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import redis from 'redis';

import postRoutes from './routes/posts.js'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

// every route inside of the postRoutes starts with '/posts'
app.use('/posts', postRoutes);

// Due to security issue, move this variable to .env later
dotenv.config();

// const CONNECTION_URL = 'mongodb+srv://choicehelper:choicehelper123@cluster0.cb2bq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const CONNECTION_URL = process.env.ATLAS_URI;
const PORT = process.env.PORT || 4000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));


// Redis for store the count value
// const redis_client = redis.createClient();
const redis_client = redis.createClient({url: process.env.REDIS_URL});
// const redis_client = redis.createClient({
//     url: REDIS_URL,
//     socket: {
//       tls: true,
//       rejectUnauthorized: false
//     }
//   });

redis_client.on('error', (err) => console.log('Redis Client Error', err));

await redis_client.connect();

export default redis_client;

await redis_client.set('key', 'value');
const value = await redis_client.get('key');
console.log(value);

// Got error 
// mongoose.set('useFindAndModify', false);

// const http = require('http').createServer(app);
// http.listen(5000, function () {
//     console.log('listening on 5000')
// });

// router.post("/selection", (req, res) => {
//     const { options, timestamp, repeat, selected_option } = req.body
//     console.log(req.body)
//     // db에 넣어주기
// });

// router.get("/recent-topics", (req, res) => {
//     console.log("최근 고민")
//     res.send("최근 고민들 db에서 json 형태로")
// });

// router.get("/hot-topics", (req, res) => {
//     console.log("핫한 고민")
//     res.send("핫한 고민들 db에서 json 형태로")
// });

// router.get("/total", (req, res) => {
//     console.log("서비스 사용횟수")
//     res.send("서비스를 총 몇 번 사용했는지 횟수")
// });

// ts로 바꾸기