import React, { useState, useEffect } from 'react'

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
    return withFirebase(
        props => {
            const [authUser, setAuthUser] = useState(null);

            useEffect(() => {
                const listener = props.firebase.auth.onAuthStateChanged(authUser => {
                    authUser ? setAuthUser(authUser) : setAuthUser(null);
                });

                return () => (
                    listener()
                );
            });

            return (
                <AuthUserContext.Provider value={authUser}>
                    <Component {...props} />
                </AuthUserContext.Provider>
            );
        }
    );
}

export default withAuthentication;
