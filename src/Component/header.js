import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {LOGOUT} from '../url';
import axios from 'axios';
const Header=(props)=>{
  const logoutHandler=()=>{
        localStorage.clear();
        window.location.reload('/') 
     }
    return(
          <header>
              <div class="shadow-sm ">
                  <nav class="navbar navbar-expand-lg navbar-light " style={{backgroundColor:'rgb(240, 245, 251)'}}>
                    <a class="navbar-brand" href="/"><img src="/images/logo.png" width="40" height="40" alt=""/></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav mr-auto">
                      </ul>
                      {localStorage.getItem('quovantis_web_token')==null && <a href="javascript:" class="nav-link disabled" onClick={()=>{localStorage.setItem('url','/');props.history.push('/login')}}>Login</a>}
                      {localStorage.getItem('quovantis_web_token')!=null && <a href="javascript:" class="nav-link disabled" onClick={logoutHandler}>Logout</a>}
                    </div>
                  </nav>
              </div>
          </header>)
}

     
export default Header