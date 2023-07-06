import User from "../models/user";
import Post from "../models/post";

export const createPost = async (req, res) => {
    const {content} = req.body;

    // VALIDATIONS
    if(!content) return res.status(400).send('Content field is required');

    // SAVING DATA
    const post = new Post({content, postedBy : req.auth._id});

    try {
        await post.save();
        return res.status(200).send('Post added successfully');
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

export const updatePost = async (req, res) => {
    const {_id, content} = req.body;

    // VALIDATIONS
    if(!_id) return res.status(400).send('Id field is required');
    if(!content) return res.status(400).send('Content field is required');

    try {
        const post = await Post.findByIdAndUpdate(_id,{content},{new : true});
        return res.status(200).send({'post' : post});
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

export const deletePost = async (req, res) => {
    // VALIDATIONS
    if(!req.params.id) return res.status(400).send('Id field is required');

    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        return res.status(200).send("Post deleted");
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

export const getUserPost = async (req, res) => {
    try {

        const currentPage = req.params.page || 1;
        const perPage = 3;

        // const posts = await Post.find({postedBy : req.auth._id})
        const posts = await Post.find()
        .skip((currentPage-1)*perPage)
        .populate("postedBy","_id name").sort({createdAt : -1})
        .limit(perPage);
        
        return res.status(200).send({'posts' : posts});
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

export const getUserPostDetails = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).send({'post' : post});
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

export const likePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.body._id, {
            $addToSet : {likes : req.auth._id}
        }, {new : true});

        return res.status(200).send({'post' : post});
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

export const unlikePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.body._id, {
            $pull : {likes : req.auth._id}
        }, {new : true});
        
        return res.status(200).send({'post' : post});
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

export const totalPosts = async (req, res) => {
    try {
        const total = await Post.find().estimatedDocumentCount();
        
        return res.status(200).send({'total' : total});
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};