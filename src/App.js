import React, { useState,useEffect } from 'react';
import Header from './Component/header';
import Footer from './Component/footer';
import routes from './routes';
import Parent from './Component/Parent'
import {Route,Switch} from "react-router-dom";
import Loader from './Component/Loader/main_loader';
import Authentication from './Container/Authentication/Authentication'
 const App=(props)=>{
  const [isLoading,changeLoading]=useState(false);
  const [loading_msg,changeLoadingMsg]=useState("Please Wait");
  useEffect(()=>{
    setTimeout(()=>changeLoading(true),500)
  })
  if(isLoading)
  {
      return(<Parent>
              <Header />
              <div class="container">
                <Switch>
                  {routes.map((route,idx)=>{
                    return(route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                          <route.component {...props}/>
                        )} />)
                        : (null))
                  })}
                </Switch>  
              </div>
              <Footer/>
            </Parent>)
  }
  else
  {
    return(<Loader message={loading_msg}/>)
  }
}
export default Authentication(App);