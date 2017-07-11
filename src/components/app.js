import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter,
         Route,
         Switch,
         Redirect } from 'react-router-dom';

import Header from './header';
import Home from './home';
import Signup from './sign_up';
import Signin from './sign_in';
import Favorites from './favorites';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route {...rest}
    render={props => ( authenticated
      ? ( <Component {...props}/> )
      : (
        <Redirect to={{
            pathname: '/signin',
            state: { from: props.location }
          }}/>
      )
  )}/>
);

const PublicRoute = ({component: Component, authenticated, ...rest}) => (
  <Route {...rest}
    render = {
      props => (authenticated === false
      ?( <Component {...props} /> )
      : (
        <Redirect
            to='/favorites' />
      )
  )} />
);


class App extends Component {

  render (){
    return (
      <BrowserRouter>
          <div>
            <Header />
            <Switch>
                {/*Watch out! Most specific route is on the top! */}
                <PublicRoute authenticated={this.props.authenticated} path="/signup" component={ Signup } />
                <PublicRoute authenticated={this.props.authenticated} path="/signin" component={ Signin } />
                <PrivateRoute authenticated={this.props.authenticated} path="/favorites" component={ Favorites } />
                <Route path="/" component={ Home } />
            </Switch>
          </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps (state){
  return { authenticated : state.auth.authenticated };
}

export default connect (mapStateToProps) (App);
