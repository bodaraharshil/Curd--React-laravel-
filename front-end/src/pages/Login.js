import React from "react";
import './styles/Login.css';
import { Field, Formik, ErrorMessage } from "formik";
import {connect} from 'react-redux';
import {Userlogin} from '../store/actions/auth';
import * as Yup from "yup";
import { withRouter,useHistory } from "react-router-dom";

const Login = (props) => {
 
  const history = useHistory();

  const myfunction = () => {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const senddata = (fields) => {
    props.Userlogin(
      {
        user_name: fields.user_name,
        password: fields.password,
      },
      history
    );
  }

  console.log(process.env.REACT_APP_NODE_API);
  return (
    <React.Fragment>
      <div className="container login-fix">
        <Formik
          initialValues={{
            user_name: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            user_name: Yup.string().required("user name is required"),
            password: Yup.string().required("password is required"),
          })}
          onSubmit={(fields) => {
            senddata(fields);
            alert("you have to successfuly login");
          }}
          render={({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="mycard">
              <form method="post" onSubmit={handleSubmit}>
                <div className="card auth-card imput-field">
                  <br />
                  <h2 style={{ fontWeight: "bolder", color: "#3A5B91" }}>
                    Login
                  </h2>
                  <Field
                    name="user_name"
                    type="text"
                    value={values.user_name}
                    onChange={handleChange}
                    placeholder="user name"
                    className={
                      "form-control" +
                      (errors.user_name && touched.user_name ? " is-invalid" : "")
                    }
                  />
                  <font color="red">
                    <ErrorMessage
                      name="user_name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </font>
                  <br />
                  <Field
                    name="password"
                    id="myInput"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="password"
                    className={
                      "form-control" +
                      (errors.password && touched.password ? " is-invalid" : "")
                    }
                  />
                  <font color="red">
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </font>
                  <br />
                  <p>
                    <label>
                      <input type="checkbox" onClick={myfunction} />
                      <span>&nbsp;&nbsp;show password</span>
                    </label>
                  </p>
                  <br />
                  <br />
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    style={{ background: "#3A5B91" }}
                    name="action"
                  >
                    Login
                  </button>
                  <br />
                  <br />
                  <br />
                </div>
              </form>
            </div>
          )}
        />
      </div>
    </React.Fragment>
  );
};

function mapDisapacthToProps(dispatch)
{
  return{
    Userlogin: (data, history) => dispatch(Userlogin(data, history)),
  }
}

export default withRouter(connect(null,mapDisapacthToProps)(Login));
