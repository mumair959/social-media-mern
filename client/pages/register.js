import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secret, setSecret] = useState('');
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useContext(UserContext);

    const router = useRouter('/');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`/register`,{
            name,
            email,
            password,
            secret
        })
        .then((res) => {
            console.log(res);
            setOk(true);
            setLoading(false);
            setName('');
            setEmail('');
            setPassword('');
            setSecret('');
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
                    <h1 className="text-center py-5">Register</h1>
                </div>
            </div>

            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <AuthForm 
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    secret={secret}
                    setSecret={setSecret}
                    loading={loading}
                    page='register'
                    ></AuthForm>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Modal 
                    title="Congratulation" 
                    open={ok}
                    onCancel={() => setOk(false)}
                    footer={null}
                    >
                        <p>You have registered successfully</p>
                        <Link href='/login' legacyBehavior>
                            <a className="btn btn-primary btn-sm">Login Now</a>
                        </Link>
                    </Modal>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p className="text-center">Already Registered? 
                        <Link href='/login' legacyBehavior>
                            <a>Login</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register;