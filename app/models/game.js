/**
 * Created by sniffer on 16.10.16.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GameSchema   = new Schema({
    title: String
});

module.exports = mongoose.model('Game', GameSchema);
