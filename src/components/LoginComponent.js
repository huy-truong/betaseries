import React from 'react'

import Form from 'react-bootstrap/Form'

import Button from 'react-bootstrap/Button'

class LoginComponent extends React.Component {

    handleSubmit = e => {
        alert("Submit");
    };

    render = () => {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="outline-primary" type="submit">Login</Button>
            </Form>
        );
    }
}

export default LoginComponent