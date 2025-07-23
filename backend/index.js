//import required modules
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/mongo.config.js';
dotenv.config({ path: './.env' });
import short_url_route from './routes/short_url.route.js';

const app = express();
//middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to the database
connectDB().then(()=> console.log('Database connected')).catch(err => console.log('Database connection failed') + err);

//define the routes
app.use("/api/shorturl", short_url_route);

//start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});