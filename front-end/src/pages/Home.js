import React,{useEffect} from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import {connect} from 'react-redux';
import {userDelete,userUpdate} from '../store/actions/user';
import {userGet} from '../store/actions/user';

const Home = (props) => {

  const history = useHistory();

  useEffect(()=>{
    props.userGet();
  },[]);

  const userdelete=(id)=>{
    props.userDelete(id);
    setTimeout(()=>{
      props.userGet();
    },200);
  };

  const myFunction = () => {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  const updateuser=(item)=>{
    history.push({pathname:'/adduser',state:item})
  }

  return (
    <div>
      <Navbar />
      <br/>
      <h2   >User Information</h2>
      <br/>
      <br/>
      <div className="container">
      <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-2" type="search" placeholder="Search" id="myInput" onKeyUp={myFunction}  aria-label="Search" style={{width:'1020px'}}/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
     </form>
     <br/>
        <table class="table" id="myTable">
          <thead class="thead-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Profile</th>
              {
                localStorage.getItem('username') === 'test' ?
                <th scope="col">Action</th>
                :
                  null
                }
            </tr>
          </thead>
          <tbody>
            {
               props.userList && Object.values(props.userList).map((item,index)=>{
                return( 
                  <tr>
              <th scope="row">{index + 1}</th>
                <td>{item.first_name}</td>  
                <td>{item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.user_name}</td>
                <td><img src={`http://127.0.0.1:8000/uploads/${item.photo}`} width='60px' height='60px' /></td>
                {
                  localStorage.getItem('username') === 'test' ?
                  <td>
                  <svg
                    width="1em"
                    style={{ color: "green",cursor:'pointer' }}
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-pencil-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={()=>updateuser(item)}
                 >
                    <path
                      fill-rule="evenodd"
                      d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                    />
                  </svg>
                  <svg
                    width="1em"
                    style={{ marginLeft: "20px", color: "red",cursor:'pointer' }}
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-trash"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={()=>userdelete(item.id)}
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </td>
                  :
                    null
                }
            </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userList: state.Userreducer.userList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
      userGet: () => dispatch(userGet()),
      userDelete: (id,history) => dispatch(userDelete(id,history)),
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));


