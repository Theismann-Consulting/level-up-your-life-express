    
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import userService from '../services/userService';

class UserForm extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    passwordConf: '',
    role: 'User',
    greeting: 'New User Information',
    edit: false,
  };

  async componentDidMount(){
    if(this.props.match && this.props.match.params.id) {
      const user = await userService.getUser(this.props.match.params.id);
      this.setState({
        name: user.user.name,
        email: user.user.email,
        googleEmail: user.user.googleEmail,
        facebookEmail: user.user.facebookEmail,
        isAdmin: user.user.isAdmin,
        avatar: user.user.avatar,
        active: user.user.active,
        greeting: `${user.user.name}'s User Information`,
        edit: true,
      })
    }
  }

  setEdit = () => {
    this.setState({
      edit: false,
    })
  }

  handleChange = (e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(this.props.match && this.props.match.params.id) {
        await userService.update(this.state, this.props.match.params.id);
        this.props.history.push(`/users/${this.props.match.params.id}`);

      } else {
        await userService.signup(this.state);
        // Let <App> know a user has signed up!
        this.props.handleSignupOrLogin();
        // Successfully signed up - show GamePage
        this.props.history.push('/');
      }
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  showPasswordFields = () => {
    if(!this.state.edit){
      return(
        <div>
        <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password || ''} />
          </Form.Group>

          <Form.Group controlId="formPasswordConf">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" name="passwordConf" placeholder="Confirm Your Password" onChange={this.handleChange} value={this.state.passwordConf || ''} />
          </Form.Group>
          </div>
      )
    }
    return(
    <div>
    <Button variant='danger' className='btn-sm' onClick={this.setEdit}>Change Password</Button>
    </div>
    )
  }

  showAdminSetting = () => {
    if(this.props.user.isAdmin){
      return(
        <Form.Group controlId="formRole">
            <Form.Label>Is Admin?</Form.Label>
            <Form.Control as="select" name="role" onChange={this.handleChange} value={this.state.role} >
              <option value="false">False</option>
              <option value='true'>True</option>
            </Form.Control>
        </Form.Group>
      )
    }
  }
  showActiveSetting = () => {
    if(this.props.user.isAdmin){
      return(
        <Form.Group controlId="formActive">
          <Form.Label>Active?</Form.Label>
          <Form.Control as="select" name="active" onChange={this.handleChange} value={this.state.role} >
            <option value="true">True</option>
            <option value='false'>False</option>
          </Form.Control>
        </Form.Group>
      );
    };
  };

  render() {
    return (
      <div>
      <h3>{this.state.greeting}</h3>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" name="name" placeholder="Full Name" onChange={this.handleChange} value={this.state.name || ''} />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name='email' placeholder="Enter email" onChange={this.handleChange} value={this.state.email || ''} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formGoogleEmail">
            <Form.Label>Google Email address</Form.Label>
            <Form.Control type="email" name='googleEmail' placeholder="Enter email" onChange={this.handleChange} value={this.state.googleEmail || ''} />
            <Form.Text className="text-muted">
              Please enter your Google Email address if you would like to use Google Login.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formFacebookEmail">
            <Form.Label>Facebook Email address</Form.Label>
            <Form.Control type="email" name='facebookEmail' placeholder="Enter email" onChange={this.handleChange} value={this.state.facebookEmail || ''} />
            <Form.Text className="text-muted">
            Please enter your Facebook Email address if you would like to use Facebook Login.
            </Form.Text>
          </Form.Group>
          {this.showPasswordFields()}
          <br />
          {this.showAdminSetting()}
          {this.showActiveSetting()}
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
export default UserForm;