import React from 'react';
import '../styles/Login.css';
import './Portfolio';
import Portfolio from './Portfolio';
const md5 = require('md5');

class Login extends React.Component {
    state = {
        loggedIn: false,
        email: '',
        password: ''
    }

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: md5(this.state.password)
            })
        });

        const data = await response.json();
        if (data.message === 'success') {
            console.log('YOU ARE IN');
            this.setState({ loggedIn: true });
        } else {
            alert('Your password is incorrect');
        }
        console.log(data);
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <form id="login-form" method="post" onSubmit={this.handleSubmit}>
                    <label>Email:</label>
                    <br></br>
                    <input type="text" name="email" onChange={e => this.setState({ email: e.target.value })} required></input>
                    <br></br>
                    <label>Password:</label>
                    <br></br>
                    <input type="password" name="password" onChange={e => this.setState({ password: e.target.value })} required></input>
                    <br></br>
                    <input type="submit" name="submit" value="Sign in" />
                </form>
            );
        } else {
            return (
                <Portfolio email={this.state.email} />
            );
        }
    }
}

export default Login;
