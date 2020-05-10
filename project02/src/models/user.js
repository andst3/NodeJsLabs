const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validator(value)
        {
            if(value.length < 7 || value === 'password')
                throw new Error("Пароль должен быть не меньше 7 символов и не должен быть 'password'");
        }
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value)
        {
            if(value < 0){
                throw new Error("Age must be a positive number");
            }
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Error: Email is invalid");
            }

        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.pre('save', async function(next) {

    const user = this;

    if(user.isModified('password'))
    {
        console.log('Пошло');
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

UserSchema.pre('update', async function(next) {
    // console.log(this);

    if(this._update.password)
    {
        console.log('Пошло');
        this._update.password = await bcrypt.hash(this._update.password, 8);
    }

    next();
});

UserSchema.pre('updateOne', async function(next) {
    // console.log(this);

    if(this._update.password)
    {
        console.log('Пошло');
        this._update.password = await bcrypt.hash(this._update.password, 8);
    }

    next();
});

UserSchema.statics.findOneByCredentials = async (email, password) => {
    const user = await User.findOne({email});



    if(!user)
    {

        throw new Error('Incorrect email');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
    {
        throw new Error('Incorrect password');
    }



    return user;
}

UserSchema.methods.generateAuthToken = async function () {

    const user = this;

    const token = jwt.sign({_id: user._id.toString()}, 'kdweueksdsjfij');

    user.tokens = user.tokens.concat({token});

    await user.save();

    return token;

}

UserSchema.methods.toJSON = function () {
    const user = this;
    console.log('user:', user);
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

UserSchema.virtual('tasks', {
    ref: "Task",
    localField: '_id',
    foreignField: 'owner'
});

const User = mongoose.model('User', UserSchema);



module.exports = User;

// user1.save().then(() => {
//     console.log('Successful');
// }).catch((err) => {
//     console.log(err.message);
// });