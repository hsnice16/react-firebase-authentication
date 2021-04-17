import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
);

const SignUpFormBase = (props) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState(null);   // to capture error obj, in case of 
                                                // sign up request fails from Firebase API

    const onSubmit = event => {
        event.preventDefault();

        props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                props.firebase
                .user(authUser.user.uid).set({username, email});
            })
            .then(() => {
                setUsername('');
                setEmail('');
                setPasswordOne('');
                setPasswordTwo('');
                setError(null);
                props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                setError(error);
            });
    }

    const isInvalid = passwordOne !==  passwordTwo || passwordOne === '' ||
                        email === '' || username === '';

    return (
        <form onSubmit={onSubmit}>
            <input 
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Full Name"
            />
            <input 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Address"
            />
            <input 
                name="passwordOne"
                value={passwordOne}
                onChange={(e) => setPasswordOne(e.target.value)}
                type="password"
                placeholder="Password"
            />
            <input 
                name="passwordTwo"
                value={passwordTwo}
                onChange={(e) => setPasswordTwo(e.target.value)}
                type="password"
                placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">Sign Up</button>

            {error && <p>{error.message}</p>}
        </form>
    );
};

const SignUpLink = () => (
    <p>
        Don't have an account ? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
        withRouter,
        withFirebase
    )(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };
