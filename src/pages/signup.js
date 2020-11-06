import React, { useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import styled from 'styled-components';
import Button from '../components/Button';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
mutation signUp($email: String!, $username: String!, $password: String!) {
signUp(email: $email, username: $username, password: $password)
}
`;

const Wrapper = styled.div`
border: 1px solid #f5f4f0;
max-width: 500px;
padding: 1em;
margin: 0 auto;
`;
const Form = styled.form`
label,
input {
display: block;
line-height: 2em;
}

input {
    width: 100%;
    margin-bottom: 1em;
    }
`;

const SignUp = props => {
//add the mutation hook


    // set the default state of the form
    const [values, setValues] = useState();
    // update the state when a user types in the form
    const onChange = event => {
        setValues({
                ...values,
                [event.target.name]: event.target.value
            });
        }

    useEffect(() => {
    // update the document title
    document.title = 'Sign Up — Notedly';
    });

    // Apollo Client
    const client = useApolloClient();

    // Mutation Hook
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
        // console.log the JSON Web Token when the mutation is complete
        //console.log(data);
        // store the JWT in localStorage
        localStorage.setItem('token', data.signUp);

        // update the local cache
        client.writeData({ data: { isLoggedIn: true } });
        // redirect the user to the homepage
        props.history.push('/');
        }
    });

return (
    <React.Fragment>
        <UserForm action={signUp} formType="signup" />
        {/* if the data is loading, display a loading message*/}
        {loading && <p>Loading...</p>}
        {/* if there is an error, display a error message*/}
        {error && <p>Error creating an account!</p>}
    </React.Fragment>

);
};
export default SignUp;