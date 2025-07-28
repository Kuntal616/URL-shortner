//import required modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/mongo.config.js';
dotenv.config({ path: './.env' });
import short_url_route from './routes/short_url.route.js';
import user_route from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import { attachUser } from './utils/attachUser.js';
//import controller for redirecting to original URL
import { handleRedirectToOriginalUrl } from './controllers/short_url.controller.js';
const app = express();
app.use(cors());

//middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//connect to the database
connectDB().then(()=> console.log('Database connected')).catch(err => console.log('Database connection failed') + err);

app.use(attachUser);
//define the routes
app.use("/api/shorturl", short_url_route);
app.use('/api/user', user_route);
//redirect route
app.get('/:shortId', handleRedirectToOriginalUrl);

//start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});