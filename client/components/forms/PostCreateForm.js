import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import('react-quill'), {ssr : false});
import 'react-quill/dist/quill.snow.css';

const PostCreateForm = ({content, setContent, createPostHandler}) => {
    return (
        <div className="card">
            <div className="card-body">
                <ReactQuill theme='snow' value={content} onChange={(e) => setContent(e)} className="form-control" placeholder="Write something..." />
            </div>
            <div className="card-footer">
                <button onClick={createPostHandler} className="btn btn-primary">Submit</button>
            </div>
        </div>
    );
};

export default PostCreateForm;