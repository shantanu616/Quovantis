import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {USERLIST} from '../url';
import axios from 'axios';
import Pagination from "react-js-pagination";
import Loader from '../Component/Loader/main_loader';
import NotFound from '../Component/not_found/not_found'
import cogoToast from 'cogo-toast';
const Home=(props)=>
{
    const [isLoading,ChangeLoading]=useState(false)
    const [loading_msg,ChangeLoadingMsg]=useState("Please Wait");
    const [userdata,ChangeUserData]=useState({});
    const [not_found,ChangeNotFound]=useState(false);
    useEffect(()=>{
      ChangeNotFound(false)
      getData(props.match.params.id);
    },[props.match.params.id]);
    const getData=(id)=>{
      axios.get(`${USERLIST}/${id}`).then((res)=>{
        if(res.status=="200")
        {
          let response=res.data;
          ChangeUserData(response.data);
          ChangeNotFound(false);
          ChangeLoading(true)
        }
      }).catch((error)=>{
        ChangeLoading(true)
        ChangeNotFound(true)
      })
    }
    if(isLoading)
    {
        if(!not_found)
        {
      	return(<section class="wrapper mt-5 pb-5">
                <h2>UserData</h2>
                <div class="align-center">
                <div class="card mt-2">
                  <img src={userdata.avatar} class="card-img-top" alt=""  style={{}}/>
                  <div class="card-body">
                    <h5 class="card-title">{userdata.first_name} {userdata.last_name}</h5>
                    <p class="card-text">{userdata.email}</p>
                    <a href="/" class="btn btn-primary">Go Back</a>
                  </div>
                </div>
                </div>
              </section>)
        }
        else
        {
          return(<NotFound/>)
        }
    }
    else
    {
      return(<Loader message={loading_msg}/>)
    }
	}
export default Home