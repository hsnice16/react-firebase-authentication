import React,{ useState } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
    <div>
        <h1>PasswordForget</h1>
        <PasswordForgetForm />
    </div>
);

const PasswordForgetFormBase = props => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = async event => {
        event.preventDefault();

        try {
            const response = await props.firebase.doPasswordReset(email);
            setEmail('');
            setError(null);
            console.log(response);
        }
        catch (error)
        {
            setError(error);
        }
    };

    const isInvalid = email === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Address"
            />
            <button disabled={isInvalid} type="submit">
                Reset My Password
            </button>

            {error && <p>{error.message}</p>}
        </form>
    );
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
