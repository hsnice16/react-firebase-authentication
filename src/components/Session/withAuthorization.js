import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
    return compose(withRouter, withFirebase)(
        props => {
                    
            useEffect(() => {
                const listener = props.firebase.auth.onAuthStateChanged(
                    authUser => {
                        if (!condition(authUser)) {
                            props.history.push(ROUTES.SIGN_IN);
                        }
                    }
                );

                return () => listener();
            });

            return (
                <AuthUserContext.Consumer>
                    {authUser => 
                        condition(authUser) ? <Component {...props} /> : null
                    }
                </AuthUserContext.Consumer>
            );
        }
    );
};

export default withAuthorization;
