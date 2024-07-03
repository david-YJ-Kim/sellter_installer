/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import React from 'react';
import './BasicFrom.css';

function EmailSignUp() {
  return (
    <form class="email-signup">
      <div class="u-form-group">
        <input type="email" placeholder="Email" />
      </div>
      <div class="u-form-group">
        <input type="password" placeholder="Password" />
      </div>
      <div class="u-form-group">
        <input type="password" placeholder="Confirm Password" />
      </div>
      <div class="u-form-group">
        <button>Sign Up</button>
      </div>
    </form>
  );
}

function SocialLogin() {
  return (
    <div class="social-login">
      <a href="#">
        <i class="fa fa-facebook fa-lg"></i>
        Login in with facebook
      </a>
      <a href="#">
        <i class="fa fa-google-plus fa-lg"></i>
        log in with Google
      </a>
    </div>
  );
}

function EmailLogin() {
  return (
    <form class="email-login">
      <div class="u-form-group">
        <input type="email" placeholder="Email" />
      </div>
      <div class="u-form-group">
        <input type="password" placeholder="Password" />
      </div>
      <div class="u-form-group">
        <Link to="/home">
          <button type="button">Log in</button>
        </Link>
      </div>
      <div class="u-form-group">
        <a href="#" class="forgot-password">
          Forgot password?
        </a>
      </div>
    </form>
  );
}

function TypeHeader() {
  return (
    <div class="lb-header">
      <a href="#" class="active" id="login-box-link">
        Login
      </a>
      <a href="#" id="signup-box-link">
        Sign Up
      </a>
    </div>
  );
}

const LoginOrAssignForm = () => {
  return (
    <div class="login-box">
      <TypeHeader></TypeHeader>
      <SocialLogin></SocialLogin>
      <EmailLogin></EmailLogin>
      {/* <EmailSignUp></EmailSignUp> */}
    </div>
  );
};

export default LoginOrAssignForm;
