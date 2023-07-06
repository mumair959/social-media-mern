import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context";
import axios from "axios";
import { useRouter } from "next/router";
import PostUpdateForm from "../../../components/forms/PostUpdateForm";

const EditPost = () => {
    const [state, setState] = useContext(UserContext);
    const [content, setContent] = useState("");

    const router = useRouter('/');
    let _id = router.query._id;

    useEffect(() => {
        if (state && state.token && _id != undefined) {
            getUserPostDetails();
        }else{
            router.push('/login');  
        }
    },[state && state.token]);

    const getUserPostDetails = async () => {
        try {
            const { data } = await axios.get(`/user-post/${_id}`);
            setContent(data.post.content);
        } catch (err) {
            console.log(err);
        }
    };

    const updatePostHandler = async () => {
        try {
            const { data } = await axios.put(`/update-post/${_id}`, {content});
            router.push('/user/dashboard');
        } catch (err) {
            console.log(err);  
        }
    };

    return (
        <div className="container-fluid">
            <div className="row bg-secondary">
                <div className="col">
                    <h1 className="text-center py-5">Edit Post</h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8 py-5">
                    <PostUpdateForm content={content} setContent={setContent} updatePostHandler={updatePostHandler}/>
                    <br />        
                </div>
                <div className="col-md-4">
                    
                </div>
            </div>
        </div>
    )
}

export default EditPost;