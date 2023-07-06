import express from "express";
import { register, login, currentUser, findPeople, addFollower, userFollow, removeFollower, userUnfollow, userFollowing } from "../controllers/auth";
import { requireSignin } from "../middlewares/auth";

const router = express.Router();

// ENDPOINTS
router.post('/register', register);

router.post('/login', login);

router.get('/current-user', requireSignin, currentUser);

router.get('/find-people', requireSignin, findPeople);

router.put('/user-follow', requireSignin, addFollower, userFollow);

router.put('/user-unfollow', requireSignin, removeFollower, userUnfollow);

router.get('/user-following', requireSignin, userFollowing);

module.exports = router;