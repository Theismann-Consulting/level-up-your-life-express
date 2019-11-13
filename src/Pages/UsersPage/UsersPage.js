import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, ListGroup, ListGroupItem, Container, Row } from 'react-bootstrap';
import userService from '../../services/userService';

class UsersPage extends Component {
  state = {
    users: [],
    loading: true,
  }

  async componentDidMount(){
    const users = await userService.getUsers();
    this.setState({ 
      users: users.users,
      loading: false,
    });
  };

    async componentDidUpdate(prevProps, prevState){
    if (this.state.users.users !== prevState.users.users) {
      const users = await userService.getUsers();

      this.setState({ users: users.users });
    }
  }

  render() {
    if(this.state.loading){
      return <div>Loading...</div>
    }
    return (
      <Container>
        <Row className="justify-content-center">
          <Button className="float-right" variant="info" as={ Link } to='/signup'>Create User</Button><br />
        </Row>
        <Row className="justify-content-center">
          {this.state.users.map((user, idx) =>
          
          <Card style={{ width: '20rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
            <Card.Header className="text-right">{user.role}</Card.Header>
            <Card.Body>
              <Card.Title>{ user.name }</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{user.email}</ListGroupItem>
            </ListGroup>
            <Card.Body>
            <Button variant="info" as={ Link } to={`/users/${user._id}`}>View User</Button>
            </Card.Body>
          </Card>
          )}
        </Row>
      </Container>
    );
  };
};

export default UsersPage;