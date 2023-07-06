import { useContext, useEffect } from "react";
import { UserContext } from "../context";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
    reconnection : true
})

const Home = () => {
    const [state, setState] = useContext(UserContext);

    useEffect(() => {
        console.log('SOCKETIO ON JOIN', socket);
    },[]);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className="text-center py-5">Home Page</h1>
                    <img className="defaultImg" src="/images/default.jpg" />
                </div>
            </div>
        </div>
    )
}

export default Home;