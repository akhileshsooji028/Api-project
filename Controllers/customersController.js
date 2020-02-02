const router = require('express').Router();
const Customer = require('../Schemas/customersSchema');

router.get('/', async (req, res) => {
    let filter = {};

    if (req.query.firstName) {
        filter.firstName = req.query.firstName
    }
    if (req.query.phoneNumber) {
        filter.phoneNumber = req.query.phoneNumber
    }
    try {
        let customers = await Customer.find(filter);
        res.status(200).json({
            customers: customers
        })
    } catch (error) {
        console.log(error)
    }
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    Customer.findById(id).then(data => {
        res.status(200).json({
            data: data
        })
    })
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Customer.findByIdAndUpdate(id, {
            $set: body,
            $inc: {
                v: 1
            }
        }, {
            new: true
        })
        .then((data) => {
            res.json({
                data: data
            })
        }).catch(err => next(err))
})

router.post('/', (req, res) => {
    console.log("hii post")
    let body = req.body;
    console.log(body)
    let customer = new Customer(body);
    customer.save().then(cust => {
        res.status(201).json({
            message: 'Customer saved successfully',
            customer: cust
        })
    }).catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    Customer.findByIdAndDelete(id).then((data) => {
        res.status(200).json({
            msg: `Customer deleted of id ${id}`,
            data: data
        })
    })
})






module.exports = router;