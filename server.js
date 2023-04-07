const express = require('express');
// const { connectToDb, getDb } = require('./db');
const mongoose = require('mongoose');
// const Movie = require('./models/movie');
const movieRoutes = require('./routes/movie-routes');
// const {ObjectId} = require("mongodb");

const PORT = 64033;
const URL = 'mongodb://localhost:27017/movibox';

const app = express();
app.use(express.json()); // Получаем возможность читать данные из запроса
app.use(movieRoutes);

// let db;

mongoose // use mongoose
    // .connect(URL, {useNewUrlParser: true, useUnifiedTopology: true}) если юзаем онлайн базу
    .connect(URL)
    .then((res) => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`);
});

// connectToDb((err) => {
//     if (!err) {
//         app.listen(PORT, (err) => {
//             err ? console.log(err) : console.log(`Listening port ${PORT}`);
//         });
//         db = getDb();
//     } else {
//         console.log(`DB connection error: ${err}`);
//     }
// });

// const handleError = (res, error) => {
//     res.status(500).json({ error });
// }
// // Rout
// app.get('/movies', (req, res) => {
//     // const movies = [];
//
//     // db
//     Movie
//         // .collection('movies')
//         .find()
//         .sort({ rating: 1 })
//         // .forEach((movie) => movies.push(movie))
//         // .then(() => {
//         .then((movies) => {
//             res
//                 .status(200)
//                 .json(movies);
//         })
//         .catch(() => handleError(res, "Something goes wrong..."));
// });
//
// app.get('/movies/:id', (req, res) => {
//     // if (ObjectId.isValid(req.params.id)) {
//     //     db
//     Movie
//         // .collection('movies')
//         // .findOne({ _id: new ObjectId(req.params.id) })
//         .findById(req.params.id)
//         // .then((doc) => {
//         .then((movie) => {
//             res
//                 .status(200)
//                 // .json(doc);
//                 .json(movie);
//         })
//         .catch(() => handleError(res, "Something goes wrong..."));
//     // } else {
//     //     handleError(res, "Wrong id");
//     // }
// });
//
// app.delete('/movies/:id', (req, res) => {
//     // if (ObjectId.isValid(req.params.id)) {
//     //     db
//         Movie
//             // .collection('movies')
//             // .deleteOne({ _id: new ObjectId(req.params.id) })
//             .findByIdAndDelete(req.params.id)
//             .then((result) => {
//                 res
//                     .status(200)
//                     .json(result);
//             })
//             .catch(() => handleError(res, "Something goes wrong..."));
//     // } else {
//     //     handleError(res, "Wrong id");
//     // }
// });
//
// app.post('/movies', (req, res) => {
//     const movie = new Movie(req.body);
//     movie
//     // db
//     //     .collection('movies')
//     //     .insertOne(req.body)
//         .save()
//         .then((result) => {
//             res
//                 .status(201)
//                 .json(result);
//         })
//         .catch(() => handleError(res, "Something goes wrong..."));
// });
//
// app.patch('/movies/:id', (req, res) => {
//     // if (ObjectId.isValid(req.params.id)) {
//     //     db
//     //         .collection('movies')
//     //         .updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
//         Movie
//             .findByIdAndUpdate(req.params.id, req.body)
//             .then((result) => {
//                 res
//                     .status(200)
//                     .json(result);
//             })
//             .catch(() => handleError(res, "Something goes wrong..."));
//     // } else {
//     //     handleError(res, "Wrong id");
//     // }
// });
