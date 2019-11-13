    
import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import UsersPage from '../UsersPage/UsersPage';
import LoginPage from '../LoginPage/LoginPage';
import UserViewPage from '../UserViewPage/UserViewPage';
import UserEditPage from '../UserEditPage/UserEditPage';
import userService from '../../services/userService';
import Navigation from '../../components/Navigation/Navigation';
import HomePage from '../../components/HomePage';
import queryString from 'query-string';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      // recipes: recipeService.getRecipes(),
    }
  }

  async componentDidMount(){
    const query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem("token", query.token);
      this.props.history.push("/");
    }
    this.setState({
      user: await userService.getCurrUser()
    })
    console.log(this.state.user);
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getCurrUser()});
  }

  render() {
    return (
      <div>
        <Navigation 
        user={this.state.user}
        handleLogout={this.handleLogout}
        handleSignupOrLogin={this.handleSignupOrLogin}
        />

          <Switch>
            <Route exact path='/' render={({ history }) => 
              <HomePage
                history={history}
                state={this.state}
              />
            }/>

            <Route exact path='/signup' render={({ history }) => 
              <UserEditPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            }/>

            <Route exact path='/login' render={({ history }) => 
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            }/>

            <Route exact path='/users' render={({ history }) => (
              // this.state.user.isAdmin === true ?
              <UsersPage
                history={history}
                user={this.state.user}
              />
              // :
              //   <Redirect to='/login'/>
            )}/>    
            <Route exact path='/users/:id' render={(props) => (
              // this.state.user.isAdmin === true ?
              <UserViewPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            // :
            //     <Redirect to='/login'/>
            )}/>      

            <Route exact path='/users/:id/edit' render={(props) => (
              // this.state.user.isAdmin === true ?
              <UserEditPage
                {...props}
                history={props.history}
                user={this.state.user}
              />
            // :
            //     <Redirect to='/login'/>
            )}/>    

          </Switch>
      </div>
    );
  }
}

export default App;