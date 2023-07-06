import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import axios from "axios";
import { useRouter } from "next/router";
import PostCreateForm from "../../components/forms/PostCreateForm";
import PostList from "../../components/cards/PostList";
import People from "../../components/cards/People";
import { Pagination } from "antd";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
    reconnection : true
})

const Dashboard = () => {
    const [state, setState] = useContext(UserContext);
    const [content, setContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [people, setPeople] = useState([]);
    const [totalPost, setTotalPost] = useState(0);
    const [page, setPage] = useState(1);

    const router = useRouter('/');

    useEffect(() => {
        if (state && state.token) {
            getCurrentUser();
            getUserPosts();
            findPeople();
        }else{
            router.push('/login');  
        }
    },[state && state.token, page]);

    useEffect(() => {
        try {
            axios.get('/total-posts').then((res) => {
                setTotalPost(res.data.total);
            });
        } catch (err) {
            console.log('Error');
        }
    },[]);

    useEffect(() => {
        socket.on("new-post", (newPost) => {
            getUserPosts();
        });
    },[]);

    const getCurrentUser = async () => {
    try {
        const { data } = await axios.get(`/current-user`);
        if (!data.Ok) {
            router.push('/login');
        }   
    } catch (err) {
        router.push('/login');
    }
    };

    const getUserPosts = async () => {
        try {
            const { data } = await axios.get(`/user-posts/${page}`);
            setPosts(data.posts);
        } catch (err) {
            console.log(err);
        }
    };

    const findPeople = async () => {
        try {
            const { data } = await axios.get('/find-people');
            setPeople(data.people)
        } catch (err) {
            console.log(err);
        }
    };

    const createPostHandler = async () => {
        try {
            const { data } = await axios.post('/create-post', {content});
            setContent("");
            setPage(1);
            getUserPosts();
            socket.emit("new-post", data);
        } catch (err) {
            console.log(err);  
        }
    };

    const deletePostHandler = async (post) => {
        try {
            const { data } = await axios.delete(`/delete-post/${post._id}`);
            getUserPosts();
        } catch (err) {
            console.log(err);  
        }
    };

    const followHandler = async (user) => {
        try {
            const { data } = await axios.put('/user-follow',{_id : user._id});
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data.user;
            localStorage.setItem("auth", JSON.stringify(auth));

            setState({...state , user : data.user});

            let filtered = people.filter((p) => p._id !== user._id);
            setPeople(filtered);
        } catch (err) {
            console.log(err);  
        }
    };

    const likeHandler = async (_id) => {
        try {
            const { data } = await axios.put('/like-post',{_id});
            getUserPosts();
        } catch (err) {
            console.log(err);  
        }
    };

    const unlikeHandler = async (_id) => {
        try {
            const { data } = await axios.put('/unlike-post',{_id});
            getUserPosts();
        } catch (err) {
            console.log(err);  
        }
    };

    return (
        <div className="container-fluid">
            <div className="row bg-secondary">
                <div className="col">
                    <h1 className="text-center py-5">Dashboard Page</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8 py-5">
                    <PostCreateForm content={content} setContent={setContent} createPostHandler={createPostHandler}/>
                    <br />
                    <PostList posts={posts} deletePostHandler={deletePostHandler} likeHandler={likeHandler} unlikeHandler={unlikeHandler}></PostList>
                    <Pagination current={page} total={(totalPost/3)*10} onChange={(value) => setPage(value)}/>
                </div>
                <div className="col-md-4">
                    <People people={people} followHandler={followHandler}></People>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;