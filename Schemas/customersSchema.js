const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSch = new Schema({
    customerId: {
        type: Number
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    phonenumber: {
        type: Number
    }
})

module.exports = mongoose.model('customers', customerSch);