import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
    handleSubmit,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    secret,
    setSecret,
    loading,
    page
}) => {
    return (
        <form onSubmit={handleSubmit}>
            {page != 'login' && (<div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name"/>
            </div>)}
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"/>
            </div>

            {page != 'login' && (<>
                <div className="mb-3">    
                    <label className="form-label">Security Question</label>
                    <select className="form-select">
                        <option value="1">What is your favorite color?</option>
                        <option value="2">What is your favorite song?</option>
                        <option value="3">What is your favorite car?</option>
                    </select>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="Write Your Answer Here"/>
                </div>
            </>)}

            {page == 'register' && (<button disabled={!name || !email || !password || !secret} type="submit" className="btn btn-primary col-12">
                {loading ? <SyncOutlined spin className="py-1"/> : 'Register'}
            </button>)}

            {page == 'login' && (<button disabled={!email || !password} type="submit" className="btn btn-primary col-12">
                {loading ? <SyncOutlined spin className="py-1"/> : 'Login'}
            </button>)}
        </form>
    );
};

export default AuthForm;