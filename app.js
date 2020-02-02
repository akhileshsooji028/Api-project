// Import Modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const middlewares = require('./Middlewares/errorhandler');
const customers = require('./Controllers/customersController');

// Data base connectivity
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/myProjectDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    data => console.log('Connected to db')
).catch(err => console.log('Issue connecting to db', err));

// Register static resources
app.use(morgan('tiny', {}));
app.use(middlewares.logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// App Routes
app.get('/', (req, res) => {
    res.send("API is up and running");
});
app.use('/customers', customers)


app.use(middlewares.notFound);
app.use(middlewares.errors);

app.listen(3055, () => console.log('Server is running on port 3055'));