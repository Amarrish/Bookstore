import path from "path";
import express from 'express';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';  
import mongoose from 'mongoose';
import booksRoute from './routes/bookRoutes.js'

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Serve uploads directory as static
app.use('/uploads', express.static('uploads'));

// Middleware for handling CORS policy
app.use(cors());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// API routes
app.use('/books', booksRoute);

// Catch-all route to serve frontend's index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Connect to MongoDB and start server
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


// import path from "path";
// import express from 'express';
// import cors from 'cors';
// import { PORT, mongoDBURL } from './config.js';  
// import mongoose from 'mongoose';
// import booksRoute from './routes/bookRoutes.js'
// const app = express();

// // middleware for parsing request body
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));
// // middleware for handling CORS POLICY
// //  Allow All origin with DEfault of cors
// app.use(cors());



// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });


// app.get('/', (request, response) => {
//     console.log(request);
//     return response.status(234).send('<h1>server responded</h1>');
// });

// app.use('/books', booksRoute);

// mongoose.connect(mongoDBURL).then(() => {
//     console.log('App connected to mongodb');
//     app.listen(PORT, () => {
//         console.log(`App is listening to port: ${PORT}`);
//     });
// }).catch((error) => {
//     console.log(error);
// });
