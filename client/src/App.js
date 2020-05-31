import React from 'react';
import MainPage from './views/MainPage';
import { Route, Switch, withRouter  } from 'react-router-dom';
import Auth from './Auth';
import {ProtectedRoute} from './ProtectedRoute'

//Pages
import Login from './views/Login';
import Register from './views/Register';
import ReactNotification from 'react-notifications-component'

class App extends React.Component {

  componentDidMount() {
    if (Auth.isAuthenticated()) {
      this.props.history.push(this.props.location.pathname)
    }else {
      if (this.props.location.pathname === '/register' || this.props.location.pathname === '/dashboard') {
        this.props.history.push(this.props.location.pathname)
      }else {
        this.props.history.push("/")
      }
    }
  };

  render() {
    return (
      <div className="App">
        <ReactNotification />
        <Switch>
          <Route path="/" exact><Login/></Route>
          <Route path="/register"><Register/></Route>
          <Route path="/dashboard" component={MainPage} />
          <ProtectedRoute path="/test" component={MainPage}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

