import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Nav = () => {
    const [current, setCurrent] = useState('');
    const [state, setState] = useContext(UserContext);

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    },[process.browser && window.location.pathname]);

    const router = useRouter();

    const logoutHandler = () => {
        window.localStorage.removeItem('auth');
        setState(null);
        router.push('/login');
    };

    return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link href="/" legacyBehavior>
                        <a className="nav-link">Home</a>
                    </Link>

                    {state !== null ? (
                        <>
                            <Link href="/user/dashboard" legacyBehavior>
                                <a className={`nav-link ${current === "/user/dashboard" && "active"}`}>{state && state.user && state.user.name}</a>
                            </Link>
                            <a onClick={logoutHandler} className="nav-link">Logout</a>
                        </>
                    ) : (
                        <>
                        <Link href="/login" legacyBehavior>
                            <a className={`nav-link ${current === "/login" && "active"}`}>Login</a>
                        </Link>
                        <Link href="/register" legacyBehavior>
                            <a className={`nav-link ${current === "/register" && "active"}`}>Register</a>
                        </Link>
                    </>
                    )}
                </div>
            </div>
        </div>
    </nav>

    );
}

export default Nav;