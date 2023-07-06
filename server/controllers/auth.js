import User from "../models/user";
import { comparePassword, hashPassword } from "../helpers/auth";
import  jwt  from "jsonwebtoken";

export const register = async (req, res) => {
    const {name, email, password, secret} = req.body;

    // VALIDATIONS
    const exists = await User.findOne({email});

    if(!name) return res.status(400).send('Name field is required');
    if(!email) return res.status(400).send('Email field is required');
    if(exists) return res.status(400).send('Email already exists');
    if(!secret) return res.status(400).send('Answer field is required');
    if(!password || password.length < 6) return res.status(400).send('Password field is required and atleast 6 characters');

    // HASH PASSWORD
    const hashedPassword = await hashPassword(password);

    // SAVING DATA
    const user = new User({name, email, password : hashedPassword, secret});

    try {
        await user.save();
        return res.status(200).send('User registered successfully');
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

export const login = async (req, res) => {
    try {
        const {name, email, password, secret} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).send('This credentials not exists in our record');
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(404).send('This credentials not exists in our record');
        }

        const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET, {
            'expiresIn' : '7d'
        });

        user.password = undefined;
        user.secret = undefined;

        return res.json({
            token,
            user
        });
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

export const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.auth._id);

        return res.json({Ok : true});
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

export const findPeople = async (req, res) => {
    try {
        const user = await User.findById(req.auth._id);
        let following = user.following;
        following.push(user._id);

        let people = await User.find({_id : {$nin : following}}).limit(10);

        return res.json({people});
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

//middleware
export const addFollower = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id, {
            $addToSet : {followers : req.auth._id}
        });

        next();
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

export const userFollow = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.auth._id, {
            $addToSet : {following : req.body._id}
        },{new : true});

        return res.status(200).send({user});
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

//middleware
export const removeFollower = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id, {
            $pull : {followers : req.auth._id}
        });
        next();
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

export const userUnfollow = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.auth._id, {
            $pull : {following : req.body._id}
        },{new : true});

        return res.status(200).send({user});
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};

export const userFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.auth._id);
        const following = await User.find({_id : user.following}).limit(100);
        return res.status(200).send({following});
    } catch (err) {
        return res.status(400).send('Oops! Something went wrong');
    }
};
