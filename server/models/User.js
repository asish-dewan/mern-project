const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            },

        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },

   // Add additional password configurations at a later stage
        password: {
            type: String,
            required: true,
            min: 5,
            unique: true,
        },

        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],

        // Uploading a picture - future dev

        // picturePath: {
        //     type: String,
        //     default: "",
        // },

        friends: {
            type: Array,
            default: [],
        },

        // future implementation
        viewedProfile: Number,
        impressions: Number,
    },
    { timestamps: true }
);

// hash user password 
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        }
    
        next();
});

// Compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
    };
    
const User = model('User', userSchema);

module.exports = User;