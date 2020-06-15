import React from 'react';
import '../styles/Register.css';

const md5 = require('md5');

class Register extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    handleSubmit = async e => {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert('Passwords not matched');
        } else {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: md5(this.state.password)
                })
            });

            const data = await response.json();
            if (data.message === 'success') {
                console.log('Account created successfully');
                alert('Account created');
            } else {
                alert('Account existed');
            }
            console.log(data);
        }
    }

    render() {
        return (
            <form id="register-form" method="post" onSubmit={this.handleSubmit}>
                <label>Name:</label>
                <br></br>
                <input type="text" name="name" onChange={e => this.setState({ name: e.target.value })} required></input>
                <br></br>
                <label>Email:</label>
                <br></br>
                <input type="text" name="email" onChange={e => this.setState({ email: e.target.value })} required></input>
                <br></br>
                <label>Password:</label>
                <br></br>
                <input type="password" name="password" onChange={e => this.setState({ password: e.target.value })} required></input>
                <br></br>
                <label>Confirm Password:</label>
                <br></br>
                <input type="password" name="confirm-password" onChange={e => this.setState({ confirmPassword: e.target.value })} required></input>
                <br></br>
                <input type="submit" name="submit" value="Sign up" />
            </form>
        );
    }
}

export default Register;
