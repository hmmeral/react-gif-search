import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { signUp } from '../actions';

class SignUp extends Component {

  renderField =  ( {label, input, type, meta: {touched, error} }) => {

      const className = `form-group ${touched && error ? 'has-danger' : '' }`;

      return (
          <div className={className}>
              <label>{label}</label>
              <input
                className="form-control"
                type ={ type }
                {...input}
                />
              <div className="text-help">
                {touched ? error : ''}
              </div>
          </div>
      );
  }

  onSubmit (values){
    console.log ("Sign Up => Values: ",values);
    this.props.signUp (values);
  }

  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return <div className="alert alert-danger">{ this.props.authenticationError }</div>;
    }
    return <div></div>;
  }

  render (){
    const { handleSubmit } = this.props;

    return(
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <h2 className="text-center">Sign Up</h2>
          { this.renderAuthenticationError() }

          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              label="Email"
              name="email"
              type="text"
              component={this.renderField}
              />
            <Field
              label="Password"
              name="password"
              type="password"
              component={this.renderField}
              />
            <Field
              label="Password Confirmation"
              name="passwordConfirmation"
              type="password"
              component={this.renderField}
               />
            <button action="submit" className="btn btn-primary">Sign up</button>
          </form>
        </div>
      </div>
    );
  }
}

function validate (values){

    const errors = {};

    if(!values.email){
      errors.email = "Please enter an email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }

    if (!values.password) {
      errors.password = "Please enter a password.";
    }

    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = "Please enter a password confirmation.";
    }

    if (values.password !== values.passwordConfirmation ) {
      errors.password = 'Passwords do not match';
    }

  return errors;

}

function mapStateToProps (state){
  return {
    authenticationError: state.auth.error
  }
}

export default reduxForm ({
  form : 'SignUp',
  validate
}) (connect(mapStateToProps, {signUp}) (SignUp));
