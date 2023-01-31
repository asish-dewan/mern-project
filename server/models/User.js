import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
   // Add additional password configurations
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

const User = mongoose.model("User", userSchema);
export default User;