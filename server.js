const express = require('express');
const { connectToDb, getDb } = require('./db');
const {ObjectId} = require("mongodb");
const app = express();
app.use(express.json()); // Получаем возможность читать данные из запроса
const PORT = 64033;
let db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`Listening port ${PORT}`);
        });
        db = getDb();
    } else {
        console.log(`DB connection error: ${err}`);
    }
});

const handleError = (res, error) => {
    res.status(500).json({ error });
}
// Rout
app.get('/movies', (req, res) => {
    const movies = [];

    db
        .collection('movies')
        .find()
        .sort({ rating: 1 })
        .forEach((movie) => movies.push(movie))
        .then(() => {
            res
                .status(200)
                .json(movies);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

app.get('/movies/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db
            .collection('movies')
            .findOne({ _id: new ObjectId(req.params.id) })
            .then((doc) => {
                res
                    .status(200)
                    .json(doc);
            })
            .catch(() => handleError(res, "Something goes wrong..."));
    } else {
        handleError(res, "Wrong id");
    }
});

app.delete('/movies/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db
            .collection('movies')
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => handleError(res, "Something goes wrong..."));
    } else {
        handleError(res, "Wrong id");
    }
});

app.post('/movies', (req, res) => {
    db
        .collection('movies')
        .insertOne(req.body)
        .then((result) => {
            res
                .status(201)
                .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

app.patch('/movies/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db
            .collection('movies')
            .updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => handleError(res, "Something goes wrong..."));
    } else {
        handleError(res, "Wrong id");
    }
});
