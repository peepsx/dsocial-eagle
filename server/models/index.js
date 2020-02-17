const mongoose = require("mongoose");
const config = require('../config/config')
mongoose.Promise = global.Promise;

const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify:  false };
const database = mongoose
	.connect(config.URL, options)
	.then(() => console.log("DB", "Connected to database."))
	.catch(err => console.log("DB ERROR", err.message));

module.exports = database;