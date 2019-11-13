import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, Card, Nav, Modal } from 'react-bootstrap';
import userService from '../../services/userService';

class LoginPage extends Component {
  
  state = {
    email: '',
    password: '',
    message: '',
  };

  handleChange = (e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push('/');
    } catch (err) {
      this.updateMessage(err.message);
      setTimeout(function(){this.updateMessage('')}.bind(this),3000);
    }
  }

  googleLogin = (e) =>{
    e.preventDefault();
    userService.googleLogin();
  }

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  render() {
    return (
      <Container>
        <Card>
          <Card.Header>
            Please Log In
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Form onSubmit={this.handleSubmit} >
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={this.state.email} name="email" onChange={this.handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={this.state.password} name="password" placeholder="Password" onChange={this.handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to='/'>Cancel</Link>
              </Form>
                <p></p>
                <Nav className="flex-column">
                  <Nav.Item href="http://localhost:3001/login/google" as={Button}>Login with Google</Nav.Item>
                  <p></p>
                  <Nav.Item href="http://localhost:3001/login/facebook" as={Button}>Login with Facebook</Nav.Item>
                </Nav>
            </Card.Text>
          </Card.Body>
        </Card>
          <p>{this.state.message}</p>
      </Container>
    );
  }
}

export default LoginPage;