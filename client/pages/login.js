import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import { useRouter } from "next/router";
import { UserContext } from "../context";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [state, setState] = useContext(UserContext);

    const router = useRouter('/');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`/login`,{
            email,
            password
        })
        .then((res) => {
            setLoading(false);
            setEmail('');
            setPassword('');
            setState({
                token : res.data.token,
                user : res.data.user
            });
            
            window.localStorage.setItem('auth',JSON.stringify(res.data));
            router.push('/user/dashboard');
        })
        .catch((err) => {
            setLoading(false);
            toast.error(err.response.data)
        });
    };

    if (state && state.token) {
        router.push('/');
    }

    return (
        <div className="container-fluid">
            <div className="row bg-secondary">
                <div className="col">
                    <h1 className="text-center py-5">Login</h1>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <AuthForm 
                    handleSubmit={handleSubmit}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    loading={loading}
                    page='login'
                    ></AuthForm>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">Not have an account? 
                        <Link href='/register' legacyBehavior>
                            <a>Register</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;