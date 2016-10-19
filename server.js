/**
 * Created by sniffer on 15.10.16.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const port = process.env.PORT || 8080;

// Import models
var Game = require('./app/models/game');

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mongoose connection
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

// Routes
var router = express.Router();

// Middleware
router.use(function (req, res, next) {
    // All requests
    console.log('Data requested');

    next();
});

router.get('/', function(req, res) {
    res.json([
        {
            title: 'GTA 5'
        },
        {
            title: 'Battlefield 1'
        }
    ]);
});

router.route('/games')
    .post(function (req, res) {

        var game = new Game();

        game.title = req.body.title;

        game.save(function (error) {
            if (error) {
                res.send(error);
            }

            res.json({ message: 'Game created' });
        });

    })
    .get(function(req, res) {
        Game.find(function(err, games) {
            if (err)
                res.send(err);

            res.json(games);
        });
    });

// All of our routes will be prefixed with /api
app.use('/api', router);

// Start server
app.listen(port);
console.log('Server started on port: ' + port);
