import { UserProvider } from "../context";
import "bootstrap/dist/css/bootstrap.min.css"
import Nav from "../components/Nav";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Head>
                <link rel="stylesheet" href="/css/custom.css"></link>
            </Head>
            <Nav />
            <ToastContainer />
            <Component {...pageProps} />
        </UserProvider>
    );
}

export default MyApp;