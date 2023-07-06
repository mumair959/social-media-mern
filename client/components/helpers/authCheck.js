// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { UserContext } from "../../context";

// export const authenticated = () => {
//     const [ok, setOk] = useState(false);
//     const [state] = useContext(UserContext);
// };


// const UserRoute = (props) => {
//     const [ok, setOk] = useState(false);
//     const [state] = useContext(UserContext);

//     const router = useRouter();

//     useEffect(() => {
//         if (state && state.token) {
//             getCurrentUser();
//         }
//     },[state && state.token]);

//     process.browser && state === null && setTimeout(() => {
//         getCurrentUser();
//     }, 1000);

//     const getCurrentUser = async () => {
//         try {
//             const { data } = await axios.get(`/current-user`);
//             if (data.Ok) {
//                 setOk(true);
//             }
//             return !ok ? (
//             <SyncOutlined 
//             spin 
//             className="d-flex justify-content-center display-1 text-primary p-5" />
//             ) : (
//                 <>{props.children}</>
//                 );
//         } catch (err) {
//             router.push('/login');
//         }
//     };
// }

// export default UserRoute;