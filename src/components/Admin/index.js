import React,{ useState,useEffect } from 'react'

import { withFirebase } from '../Firebase';

const AdminPage = props => {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setLoading(true);

        const unsub = props.firebase.users().onSnapshot( snapshot => {
            let usersList = [];

            snapshot.forEach(doc => {
                usersList.push({...doc.data(), uid: doc.id});
            });

            setUsers(usersList);
            setLoading(false);
        });

        return () => unsub();
    }, [props.firebase]);

    return (
        <div>
            <h1>Admin</h1>

            {loading && <div>Loading ...</div>}

            <UserList users={users}/>
        </div>
    );
};

const UserList = ({ users }) => (
    <ul>
        {
            users.map(user => (
                <li key={user.uid}>
                    <span>
                        <strong>ID:</strong> {user.uid}
                    </span>
                    <span>
                        <strong>E-Mail:</strong> {user.email}
                    </span>
                    <span>
                        <strong>Username:</strong> {user.username}
                    </span>
                </li>
            ))
        }
    </ul>
);

export default withFirebase(AdminPage);
