import React from 'react';
import {Link, useHistory, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './style.css';
import {Logout} from '../store/actions/auth';

const Navbar = (props) => {

  const history=useHistory();

  const logout = () =>{
    props.Logout(history);
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
  

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
  <a class="navbar-brand" href="/">Curd-Demo</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <Link to="/adduser"><button class="btn btn-primary" type="submit">Add New User</button></Link>
        </li>
    </ul>
    <ul class="navbar-nav mr-right">
    <li class="nav-item "> 
      {localStorage.getItem('jwt') ?
        <button class="btn btn-primary" type="submit" onClick={logout}>   Logout   </button>
      :
      <Link to="/Login"><button class="btn btn-primary" type="submit">   Login   </button></Link>
      }
    
    </li>
    </ul>
  </div>
</nav>
        </div>
    )
}

function mapDispatchToProps(dispatch)
{
  return {
    Logout: (history) => dispatch(Logout(history)),
  }
}

export default withRouter(connect(null,mapDispatchToProps)(Navbar));