const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User")

// create a post

router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(err){
        res.status(500).json(err);
    }
})

// update a post

router.put("/:id", async(req, res) => {
    try {
        const post= await Post.findById(req.params.id);
        if (post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json("the post has been updated");
        } else {
            res.status(409).json("you can only update your post");
        }
    } catch(err) {
        res.status(500).json(err);
    }
})

// delete a post

router.delete("/:id", async(req, res) => {
    try {
        const post= await Post.findById(req.params.id);
        if (post.userId === req.body.userId){
            await post.deleteOne({$set: req.body});
            res.status(200).json("the post has been deleted");
        } else {
            res.status(409).json("you can only delete your post");
        }
    } catch(err) {
        res.status(500).json(err);
    }
})

// like and dislike a post

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        // check this likes array if it includes this user id
        //if it doesn't then go ahead and like it
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push: { likes: req.body.userId }});
            res.status(200).json("this post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId }});
            res.status(200).json("this post has been disliked");
        }
    } catch(err) {
        res.status(500).json(err);
    }
})

// get a post

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
})

// get timeline posts (all followings)

router.get("/timeline/all", async (req, res) => {
    try {
        // first find the current user
        const currentUser = await User.findById(req.body.userId);
        // find all posts of this of the current user 
        const userPosts = await Post.find({ userId: currentUser._id });
        //We all post of his followings
        // We will use promise because we will have multiple promises
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.json(userPosts.concat(...friendPosts))
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;