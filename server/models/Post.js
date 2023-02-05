const { Schema, model } = require ('mongoose');

const postSchema = new Schema({
    postText: {
        type: String,
        minlength: 1,
        maxlength: 220,
        trim: true,
    },
    postUser: {
        type: String,
        required: true,
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },

    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 220,
            },
            commentUser: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
    ],

    // future dev
/*    
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean,
    }
*/ 
    
    },
    {timestamps: true }
);

const Post = model('Post', postSchema);

module.exports = Post;

