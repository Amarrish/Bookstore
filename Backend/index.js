import path from "path";
import express from 'express';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';  
import mongoose from 'mongoose';
import booksRoute from './routes/bookRoutes.js'
const app = express();

// middleware for parsing request body
app.use(express.json());
app.use('/uploads', express.static('uploads'));
// middleware for handling CORS POLICY
//  Allow All origin with DEfault of cors
app.use(cors());

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('<h1>server responded</h1>');
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to mongodb');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});
