import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes'

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
);

const SignInFormBase = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = async event => {
        event.preventDefault();

        try {
            const response = await props.firebase
                .doSignInWithEmailAndPassword(email, password)
            console.log(response);
            setEmail('');
            setPassword('');
            setError(null);
            props.history.push(ROUTES.HOME);
        }
        catch (error)
        {
            setError(error);
        }
    }

    const isInvalid = password === '' || email === '';

    return (
        <form onSubmit={onSubmit}>
            <input 
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Address"
            />
            <input 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
            />
            <button disabled={isInvalid} type="submit">
                Sing In
            </button>

            {error && <p>{error.message}</p>}
        </form>
    );
}

const SignInForm = compose(
        withRouter,
        withFirebase
    )(SignInFormBase);

export default SignInPage;

export { SignInForm };
