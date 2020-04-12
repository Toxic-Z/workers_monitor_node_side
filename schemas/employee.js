const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength:3,
        maxlength:20
    },
    gender:  {
        type: String,
        required: true,
        minlength:1,
        maxlength:1
    },
    contactInfo : {
        address: {
            type: {
                city: {
                    type: String,
                    required: true,
                    minlength: 3,
                    maxlength: 15
                },
                street: {
                    type: String,
                    required: true,
                    minlength: 1,
                    maxlength: 20
                },
                houseN: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 9999
                },
                addN: {
                    type: String,
                    required: true,
                    maxlength: 3
                },
            },
            required: true
        },
        email : {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 30
        }
    },
    addDate: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true,
        min: 500,
        max: 5000000
    },
    position: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15
    }
});
module.exports = employeeSchema;