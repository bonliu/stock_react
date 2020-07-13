import React from 'react';
import '../styles/Home.css';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
    toLogin = () => {
        this.props.history.push('/login');
    };

    toSignup = () => {
        this.props.history.push('/signup');
    };

    render() {
        return (
            <div>
                <h1>Stock Pro</h1>
                <button onClick={this.toLogin}>Login</button>
                <button onClick={this.toSignup}>Register</button>
            </div>
        );
    }
}

export default Home;
