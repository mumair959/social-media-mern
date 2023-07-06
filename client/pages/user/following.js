import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context";
import Link from "next/link";
import moment from "moment";
import { Avatar, List } from "antd";
import axios from "axios";
import { useRouter } from "next/router";

const People = () => {
    const [state, setState] = useContext(UserContext);
    const [people, setPeople] = useState([]);

    const router = useRouter();

    useEffect(() => {
        if (state && state.token) {
            getFollowedPeople();
        }else{
            router.push('/login');  
        }
    },[state && state.token]);

    const getFollowedPeople = async () => {
        try {
            const { data } = await axios.get('/user-following');
            setPeople(data.following);
        } catch (err) {
            console.log(err);
        }
    };

    const unfollowHandler = async (user) => {
        try {
            const { data } = await axios.put('/user-unfollow',{_id : user._id});
            let auth = JSON.parse(localStorage.getItem("auth"));
            auth.user = data.user;
            localStorage.setItem("auth", JSON.stringify(auth));

            setState({...state , user : data.user});

            let filtered = people.filter((p) => p._id !== user._id);
            setPeople(filtered);
        } catch (err) {
            console.log(err);  
        }
    };

    return (
        <div className="col-md-6 offset-md-3">
            <div className="py-5">
                <div className="card">
                    <div className="card-header">
                        <h4>People</h4>
                    </div>
                    <div className="card-body">
                        <List
                            itemLayout="horizontal"
                            dataSource={people}
                            renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                title={<div className="d-flex justify-content-between">
                                    {item.name} <span onClick={() => unfollowHandler(item)} className="text-primary pointer">Unfollow</span>   
                                </div>}
                                />
                            </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default People;