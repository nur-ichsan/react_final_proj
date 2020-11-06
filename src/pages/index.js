// import React and routing dependencies
import React from 'react';
// update our react-router import to include Redirect
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

// import the NewNote route component
import NewNote from './new';


// import shared layout component
import Layout from '../components/Layout';

// import routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';
// import the signup route
import SignUp from './signup';

// import the sign-in page component
import SignIn from './signin';
// import the edit page component
import EditNote from './edit';

// define routes
const Pages = () => {
return (
    <Router>
        <Layout>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/mynotes" component={MyNotes} />
            <PrivateRoute path="/favorites" component={Favorites} />
            <Route path="/note/:id" component={NotePage} /> 
            <Route path="/signup" component={SignUp} /> 
            <Route path="/signin" component={SignIn} /> 
            <PrivateRoute path="/new" component={NewNote} />
            <PrivateRoute path="/edit/:id" component={EditNote} />        
        </Layout>

    </Router>
)

};


// add the PrivateRoute component below our `Pages` component
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;
    // if the user is logged in, route them to the requested component
    // else redirect them to the sign-in page
    return (
        <Route
        {...rest}
        render={props => data.isLoggedIn === true ? ( <Component {...props} /> ) : 
            ( <Redirect to={{ pathname: '/signin', state: { from: props.location }}} /> )
        }
        />
    );
    };
export default Pages;