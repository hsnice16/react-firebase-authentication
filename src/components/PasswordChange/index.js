import React,{ useState } from 'react'
import { withFirebase } from '../Firebase';

const PasswordChangeForm = props => {
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState(null);

    const onSubmit = async event => {
        try {
            const response = await props.firebase.doPasswordUpdate(passwordOne);
            console.log(response);
            setPasswordOne('');
            setPasswordTwo('');
            setError(null);
        } catch(error) {
            setError(error);
        }

        event.preventDefault();
    }

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
        <form onSubmit={onSubmit}>
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={(e) => setPasswordOne(e.target.value)}
                type="password"
                placeholder="New Password"
            />
            <input 
                name="passwordTwo"
                value={passwordTwo}
                onChange={(e) => setPasswordTwo(e.target.value)}
                type="password"
                placeholder="Confirm New Password"
            />
            <button disabled={isInvalid} type="submit">
                Reset My Password
            </button>

            {error && <p>{error.message}</p>}
        </form>
    );
}

export default withFirebase(PasswordChangeForm);
