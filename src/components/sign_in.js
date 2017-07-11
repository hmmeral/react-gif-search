import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect } from 'react-redux';

import { signIn } from '../actions';

class Login extends Component {

  renderField = ( {input, label, type, meta:{touched, error}} ) => {
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input
          className="form-control"
          type={type}
          placeholder={label}
          {...input}  />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );

  }

  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return <div className="alert alert-danger">{ this.props.authenticationError }</div>;
    }
    return <div></div>;
  }

  onSubmit (values){
      this.props.signIn(values);
  }

  render (){
    const { handleSubmit, pristine, invalid } = this.props;

    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Log In</h2>
           { this.renderAuthenticationError() }

          <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
              <Field name="email"
                     component={this.renderField}
                     className="form-control"
                     type="text"
                     label="Email"
                     />
              <Field name="password"
                     component={this.renderField}
                     className="form-control"
                     type="password"
                     label="Password"
                     />
            <button
              action="submit"
              className="btn btn-primary"
              disabled={pristine || invalid} >
                Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

}

function validate (values){
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};

function mapStateToProps (state){
  return {
    authenticationError: state.auth.error
  }
}

export default reduxForm ({
    form: 'login',
    validate
}) ( connect (mapStateToProps, {signIn}) (Login) );
