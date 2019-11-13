import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem, Nav, Button } from 'react-bootstrap';
import userService from '../../services/userService';

class UserViewPage extends Component {
  state = {
    user: '',
    message: '',
    loading: true,
  }

  async componentDidMount() {
    const user = await userService.getUser(this.props.match.params.id);
    this.setState({
      user: user.user,
      loading: false,
    });
  };

  updateMessage = (msg) => {
    this.setState({message: msg});
  }

  handleDelete = async (e) => {
    try {
      if(this.props.match && this.props.match.params.id) {
        await userService.delete(this.props.match.params.id);
        this.props.history.push('/users');
      };
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.updateMessage(err.message);
    }
  }

  showGoogleAccount = () => {
    if(this.state.user.googleId){
      return(
        <Nav.Item onClick={this.disconnectGoogle} as={Button}>Disconnect {this.props.user.googleName}'s Google Account</Nav.Item>
        )
      } else {
        return(
          <Nav.Item href='http://localhost:3001/login/google' as={Button}>Link Your Google Account</Nav.Item>
        )
      }
  
    }
  showFacebookAccount = () => {
    if(this.state.user.facebookId){
      return(
        <Nav.Item onClick={this.disconnectFacebook} as={Button}>Disconnect {this.props.user.facebookName}'s Facebook Account</Nav.Item>
        )
      } else {
        return(
          <Nav.Item href='http://localhost:3001/login/facebook' as={Button}>Link Your Facebook Account</Nav.Item>
        )
      }
  }

  disconnectGoogle = () => {
    userService.disconnectGoogle(this.state.user._id);
  }

  disconnectFacebook = () => {
    userService.disconnectFacebook(this.state.user._id);
  }


  render() {
    if(this.state.loading){
      return(
        <div>Loading...</div>
      )
    }
    return (
      <div className="body">
      <h3>{this.state.message}</h3>
        <Card>
          {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
          <Card.Header className="text-right">{this.state.user.role}</Card.Header>
          <Card.Body>
            <Card.Title>{this.state.user.name}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>{this.state.user.email}</ListGroupItem>
          </ListGroup>
          <Card.Body>
            <Card.Link as={ Link } to={`/users/${this.state.user._id}/edit`}>Edit User</Card.Link>
          </Card.Body>
          <Card.Footer>
            <Nav>
              {this.showGoogleAccount()}
              <Nav.Item>&nbsp;&nbsp;</Nav.Item>
              {this.showFacebookAccount()}
            </Nav>
          </Card.Footer>
        </Card>
      </div>
    )
  };
};

export default UserViewPage;