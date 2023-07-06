import { useContext } from "react";
import { UserContext } from "../../context";
import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import { useRouter } from "next/router";
import { HeartOutlined, HeartFilled, CommentOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const PostList = ({posts, deletePostHandler, likeHandler, unlikeHandler}) => {
    const [state] = useContext(UserContext);
    const router = useRouter();

    return (
        <>{posts && posts.map((post) => <div key={post._id} className="card mb-5">
            <div className="card-header">
                <Avatar size={40} className="mb-2">{post.postedBy.name[0]}</Avatar>
                <span className="pt-2 ml-3">{post.postedBy.name}</span>
                <span className="pt-2 ml-3">{moment(post.createdAt).fromNow()}</span>
            </div>
            <div className="card-body">
                {renderHTML(post.content)}
            </div>
            <div className="card-footer d-flex">
                {post.likes.includes(state.user._id) ? (
                    <HeartFilled onClick={() => unlikeHandler(post._id)} className="text-danger pt-2 h5"/>
                ) : (
                    <HeartOutlined onClick={() => likeHandler(post._id)} className="text-danger pt-2 h5"/>
                )}
                
                <div className="pt-2">{post.likes.length} likes</div>
                <CommentOutlined className="text-danger pt-2 pl-3 h5"/>
                <div className="pt-2 pl-3">2 comments</div>

                {state && state.user && state.user._id === post.postedBy._id && (
                <>
                    <EditOutlined onClick={() => router.push(`/user/post/${post._id}`)} className="text-danger pt-2 h5 mx-auto"/>
                    <DeleteOutlined onClick={() => deletePostHandler(post)} className="text-danger pt-2 h5"/>
                </>
                )}
                
            </div>
        </div>)}</>
    );
};

export default PostList;