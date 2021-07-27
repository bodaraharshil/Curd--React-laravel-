import axios from "axios";

export function setLoggedIn() {
  return (dispatch) => {
    dispatch({
      type: "SET_LOGGED_IN",
    });
  };
}

export function Userlogin(user, history) {
  return (dispatch) => {
    return axios
      .post(`http://127.0.0.1:8000/api/login`, user)
      .then((response) => {
          console.log("you have to successfuly login", response)
          localStorage.setItem('jwt',response.data.token);
          localStorage.setItem('username',response.data.user.user_name);
        dispatch({
          type: "LOGIN_SUCCESS",
          message: response.data.message,
          status: response.data.status,
        });
        history.push("/");
      })
      .catch(function (error) {
        dispatch({
          type: "LOGIN_FAILURE",
          message: "Something went wrong",
        });
      });
  };
}

export function Logout(history) {
  return (dispatch) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    dispatch({
      type: "LOGOUT_SUCCESS",
      message: "logout success user",
    });
    history.push("/Login");
  };
}
