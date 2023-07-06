import Post from "../models/post";

export const canEditDeletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (req.auth._id != post.postedBy) {
            return res.status(400).send("Unauthorized");
        }
        else{
            next();
        }
    } catch (err) {
        console.log(err)
    }
};