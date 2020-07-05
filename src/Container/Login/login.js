import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {LOGIN,TOKEN} from '../../url.js';
import LoadingGif from '../../Component/Loader/main_loader'
import cogoToast from 'cogo-toast';
import TogglePassword from '../../Component/togglepass';
import InputBox from '../../Component/InputBox';
const Login=(props)=>
{
  const [isLoading,ChangeLaoding]=useState(false);
  const [btnDisable,ChangebtnDisable]=useState(false);
  const [loading_msg,ChangeMsg]=useState("Please Wait");
  const LoginHandler=(e)=>{
      let email=e.target.lemail.value.trim();
      let password=e.target.lpassword.value.trim();
      if(email=="" || password=="")
      {
          cogoToast.error("All fields must be filled");
          return false;
      }
      ChangebtnDisable(true);
      ChangeLaoding(true);
      $('#login_err_msg').html('');
        axios.post(LOGIN, {
        email:email,
        password:password
      })
      .then(response=>{
          if(response.status=='200'){
            localStorage.setItem('status','Y');
            localStorage.setItem('quovantis_web_token',response.data.token);
            localStorage.setItem('email',email);
            ChangeMsg("Logging In Please Wait");
            ChangebtnDisable(false);
            ChangeLaoding(true);
            cogoToast.success('Logged in successfully!');
            setTimeout(()=>props.history.replace('/'),1500);
          }
          else {
            ChangebtnDisable(false);
            ChangeLaoding(false);
            $('#login_err_msg').html('Invalid Credentials');
          }
      })
      .catch( (error)=> {
          cogoToast.error("User Not Found");
          ChangebtnDisable(false);
          ChangeLaoding(false);
          //console.log(error);
      });
  }
  if(TOKEN)
  {
    return(<Redirect to="/"/>)
  }
  else
  {
   if(!isLoading)
    {
      return(<div class="container center_div">
              <section class="login_page">
                <article class="login">
                  <form onSubmit={LoginHandler} id="login_form" >
                      <div class="logo">
                          <a href="/">
                              <img src="/images/logo.png" alt="" />
                          </a>
                      </div>
                      <h2>Log In</h2>
                      <div class="fields">
                          <div class="inputbox">
                              <label>Email</label>
                              <InputBox type="email" placeholder="Enter Email" required={true}  name="lemail"/>
                          </div>
                          <div class="inputbox">
                              <label>Password</label>
                              <InputBox type="password" placeholder="Enter Password" name="lpassword" id="lpassword" required={true}/>
                              {/*<TogglePassword  id1="lpassword" id2="leyepass"/>*/}
                          </div>
                      </div>
                        <span id="login_err_msg"></span>
                        <div class="buttons">
                            <button type="submit" class="btn btn_submit" disabled={btnDisable}>{btnDisable?"Loading...":"Login"}</button>
                        </div>
                  </form>
              </article>
            <div class="clearfix"></div>
         </section>
       </div>)
    }
    else
    {
      return(<LoadingGif message={loading_msg}/>)
    }
  }
}
export default Login;