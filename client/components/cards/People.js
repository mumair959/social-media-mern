import { useContext } from "react";
import { UserContext } from "../../context";
import Link from "next/link";
import moment from "moment";
import { Avatar, List } from "antd";
import { useRouter } from "next/router";

const People = ({people, followHandler}) => {
    const [state] = useContext(UserContext);
    const router = useRouter();

    return (
        <div className="py-5">
            <div className="card">
                <div className="card-header">
                    <h4>People</h4>
                    <p>{state && state.user && (<Link href="/user/following" legacyBehavior>
                        <a className="h6">Following {JSON.parse(localStorage.getItem("auth")).user.following.length}</a>
                    </Link>)}</p>
                </div>
                <div className="card-body">
                    <List
                        itemLayout="horizontal"
                        dataSource={people}
                        renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                            title={<div className="d-flex justify-content-between">
                                 {item.name} <span onClick={() => followHandler(item)} className="text-primary pointer">Follow</span>   
                            </div>}
                            />
                        </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default People;