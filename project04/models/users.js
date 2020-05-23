const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate(value) {
            if(value.length < 2)
                throw new Error("В name должен быть не меньше 2 символов");
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value))
                throw new Error('Неправильный email');
        }
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if(value < 0)
                throw new Error("Возраст не может быть меньше 0");
        }
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;