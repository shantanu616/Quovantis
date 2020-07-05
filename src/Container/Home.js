import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {USERLIST,TOKEN} from '../url';
import axios from 'axios';
import Pagination from "react-js-pagination";
import Loader from '../Component/Loader/main_loader';
import cogoToast from 'cogo-toast';
import $ from 'jquery'
const Home=(props)=>
{
    const [isLoading,ChangeLoading]=useState(false)
    const [loading_msg,ChangeLoadingMsg]=useState("Please Wait");
    const [userlist,ChangeUserList]=useState([]);
    const [pagination,ChangePagination]=useState({page:1,per_page:10,total:0,pageRangeDisplayed:4});
    useEffect(()=>{
      getData('1');
    },[pagination.currentPage]);
    const getData=(page)=>{
      axios.get(`${USERLIST}?page=${page}`).then((res)=>{
        if(res.status=="200")
        {
          let response=res.data;
          ChangeUserList(response.data)
          ChangePagination({...pagination,page:response.page,per_page:response.per_page,total:response.total})
        }
        ChangeLoading(true)
      }).catch((error)=>{
        
      })
    }
    const clickHandler=(e)=>{
      if(e.target.localName=="img")
      { 
        let id=e.target.id
        props.history.push(`/users/${id}`)
      }
    }
    if(isLoading)
    {
      const UserData=(userlist.length>0?userlist.map((res,key)=>{
        return(<tr key={key} >
                <td><img src={res.avatar} width="40" height="40" id={res.id}/></td>
                <td>{res.first_name}</td>
                <td>{res.last_name}</td>
                <td>{res.email}</td>
            </tr>)
       }):<tr><td colspan="4">No result Found</td></tr>)
      	return(<section class="wrapper mt-5 pb-5">
                <h2>UserList</h2>
                <p></p> 
                <table class="table table-striped mt-5">
                    <thead>
                      <tr>
                        <th>Profile Pic</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody onClick={clickHandler}>
                        {UserData}
                    </tbody>
                  </table>
                {pagination.total>1 && <div class="float-right mt-3">
                  <Pagination
                      activePage={pagination.page}
                      itemsCountPerPage={pagination.per_page}
                      totalItemsCount={pagination.total}
                      pageRangeDisplayed={pagination.pageRangeDisplayed}
                      onChange={getData}
                      itemClass='page-item'
                      linkClass="page-link bold"
                   />
              </div>}
              </section>)
    }
    else
    {
      return(<Loader message={loading_msg}/>)
    }
	}
export default Home