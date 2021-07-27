import React,{useEffect} from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import  {Provider}  from "react-redux";
import store from "./store/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Adduser from './pages/Adduser';

const Routing = () => {
  
  const history = useHistory();
  useEffect(()=>{
    const jwt=localStorage.getItem("jwt")
    if(!jwt)
    {
      history.push("/Login");    
    }
  })

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/adduser">
          <Adduser />
        </Route>
      </Switch>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </React.Fragment>
    </Provider>
  );
}

export default App;
