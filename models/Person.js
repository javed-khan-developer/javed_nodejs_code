const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
//define the person schema

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

personSchema.pre('save', async function (next) {
    const person = this;
    //hash the password only if it is modified or it's new
    if (!person.isModified('password')) return next();
    try {
        //hash password generation
        const salt = await bcrypt.genSalt(10)
        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt)
        //override the plain password with hashed one 
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        //use the bcrypt to compare the provided password with hashed password
        const isMatch=await bcrypt.compare(candidatePassword,this.password)
        return isMatch;
    } catch (error) {
        throw error;
    }
}

//create a person model

const person = mongoose.model('Person', personSchema)
module.exports = person;