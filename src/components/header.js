import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter  } from 'react-router-dom';

import { signOut } from '../actions';

class Header extends Component {

  signOut (){
     this.props.signOut( () => {
        this.props.history.push ('/home');
      });
  }

  renderHeader(){

      if(this.props.authenticated){
        return [
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/home">Home</Link>
          </li>,
          <li className="nav-item" key={2}>
             <Link className="nav-link" to="/favorites">Favorites</Link>
          </li>,
          <li className="nav-item" key={3}>
             <a className="nav-link" onClick={ () => this.signOut() }>
               Sign Out
             </a>
          </li>
        ];
      }
      else{
        return [
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/signin">Login</Link>
          </li>,
          <li className="nav-item" key={2}>
             <Link className="nav-link" to="/signup">Signup</Link>
          </li>
        ];
      }
  }

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">React2Gifs</Link>
          </div>
           <ul className="nav navbar-nav navbar-right">
             {this.renderHeader()}
           </ul>
        </div>
      </nav>
    );
  }

}

function mapStateToProps (state){
  return { authenticated : state.auth.authenticated };
}

export default withRouter(connect(mapStateToProps, {signOut})(Header));
