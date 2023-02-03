const db = require('../config/connection');
const { User, Post } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const { post } = require('../routes');

db.once('open', async () => {
    try {
        await post.deleteMany({});
        await User.deleteMany({});

        await User.create(userSeeds);

        for (let i = 0; i < postSeeds.length; i++) {
            const { _id, postUser } = await Post.create(postSeeds[i]);
            const user = await User.findOneAndUpdate(
                { username: postUser },
                {
                    $addToSet: {
                        posts: _id,
                    },
                }
            );
        }
    } catch(err) {
        console.error(err);
        // This method instructs Node.js to terminate the process synchronously with an exit status of code.
        // The default code is '0' but '1' refers to uncaught fatal exception. It is an efficient method to terminate the process
        process.exit(1);
    }

    console.log('Seeds loaded!');
    // Node will normally exit with a 0 status code when no more async operations are pending.
    process.exit(0);
});