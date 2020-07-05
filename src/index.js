import React from 'react';
import ReactDOM from 'react-dom';
import {Switch,BrowserRouter as Router,Route,Redirect} from "react-router-dom";
import Login from './Container/Login/login' 
import ScrollToTop from './Container/scrolltotop'
import Home from './App';
import axios from 'axios'
class MainContainer extends React.Component
{
	componentDidMount()
	{
		if(localStorage.getItem('quovantis_version')==null)
		{
		  localStorage.clear();
		  localStorage.setItem('quovantis_version','1.0');

		}
		else if(localStorage.getItem('quovantis_version')!='1.0')
		{
		  localStorage.clear();
		  localStorage.setItem('quovantis_version','1.0')
		}
	    //this.setStorage();
   }
  setStorage=()=>{
  	localStorage.setItem('url','/');
    if(localStorage.getItem('user_id')==null )
    {
      localStorage.setItem('user_id',0)
    }
   }
	render()
	{
		return(
	    <Router>
	      <ScrollToTop />
	      <Switch>
	      	  <Route path="/users" component={Home}/>
		      <Route path="/" exact={true} component={Home}>
		      	<Redirect to="/users"/>
		      </Route>
		      <Route path="/login" exact={true} component={Login}/>
	      </Switch>
	    </Router>)
    }
 }
ReactDOM.render( <MainContainer />,document.getElementById('root'));