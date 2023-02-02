const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },

        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },

        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            min: 5,
            unique: true,
        },
   // Add additional password configurations at a later stage
        password: {
            type: String,
            required: true,
            min: 5,
            unique: true,
        },

        picturePath: {
            type: String,
            default: "",
        },

        friends: {
            type: Array,
            default: [],
        },

        viewedProfile: Number,
        impressions: Number,
    },
    { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;