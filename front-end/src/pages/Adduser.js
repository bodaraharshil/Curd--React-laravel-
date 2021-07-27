import React,{useState,useEffect} from "react";
import './styles/Login.css';
import { Field, Formik, ErrorMessage } from "formik";
import { Link,withRouter,useHistory, useLocation } from "react-router-dom";
import {userRegister,userUpdate} from '../store/actions/user';
import {connect} from 'react-redux';
import * as Yup from "yup";

const Adduser = (props) => {
    const history = useHistory();
    const [Photo, setPhoto] = useState(null);

    /****update user*****/
    const [UpdateFirst_name, setUpdateFirst_name] = useState('');
    const [UpdateLast_name, setUpdateLast_name] = useState('');
    const [UpdateEmail, setUpdateEmail] = useState(''); 
    const [UpdateUser_name, setUpdateUser_name] = useState('');
    const [UpdatePhoto, setUpdatePhoto] = useState('');
    const [UpdatedId, setUpdatedId] = useState('');

    const senddata = (fields) => {
        console.log('Photo', Photo);
        let formData = new FormData();

        formData.append('first_name', fields.first_name);
        formData.append('last_name', fields.last_name); 
        formData.append('email', fields.email);
        formData.append('user_name', fields.user_name);
        formData.append('photo', Photo);
        formData.append('password', fields.password);
        props.userRegister(formData, history);
    }

    const updatedata = (fields) => {
        let formData = new FormData();
        formData.append('first_name', fields.UpdateFirst_name);
        formData.append('last_name', fields.UpdateLast_name);
        formData.append('email', fields.UpdateEmail);
        formData.append('user_name', fields.UpdateUser_name);
        formData.append('photo', UpdatePhoto);
        props.userUpdate(UpdatedId, formData, history);
    }

    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const data = location.state;
            console.log(data);
            setUpdateFirst_name(data.first_name);
            setUpdateLast_name(data.last_name);
            setUpdateEmail(data.email);
            setUpdateUser_name(data.user_name);
            setUpdatedId(data.id);
        }
    }, [])

  return (
    <React.Fragment>
        {location.state ?
            <div className="container login-fix">
            <Formik
              initialValues={{
                UpdateFirst_name:location.state ? location.state.first_name : "",
                UpdateLast_name:location.state ? location.state.last_name : "",
                UpdateEmail:location.state ? location.state.email : "",
                UpdateUser_name: location.state ? location.state.user_name : "",
              }}
              validationSchema={Yup.object().shape({
                UpdateFirst_name: Yup.string().required("First name is required"),
                UpdateLast_name: Yup.string().required("Last name is required"),
                UpdateEmail: Yup.string().required("Email is required"),
                UpdateUser_name: Yup.string().required("Username is required"),
              })}
              onSubmit={(fields) => {
                updatedata(fields);
                alert("user register successfuly");
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
                         User Information
                      </h2>
                      <Field
                        name="UpdateFirst_name"
                        type="text"
                        value={values.UpdateFirst_name}
                        onChange={handleChange}
                        placeholder="First name"
                        className={
                          "form-control" +
                          (errors.UpdateFirst_name && touched.UpdateFirst_name ? " is-invalid" : "")
                        }
                      />
                      <font color="red">
                        <ErrorMessage
                          name="UpdateLast_name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </font>
                      <br />
                      <Field
                        name="UpdateLast_name"
                        type="text"
                        value={values.UpdateLast_name}
                        onChange={handleChange}
                        placeholder="Last name"
                        className={
                          "form-control" +
                          (errors.UpdateLast_name && touched.UpdateLast_name ? " is-invalid" : "")
                        }
                      />
                      <font color="red">
                        <ErrorMessage
                          name="Last_name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </font>
                      <br />
                      <Field
                        name="UpdateEmail"
                        type="text"
                        value={values.UpdateEmail}
                        onChange={handleChange}
                        placeholder="Email"
                        className={
                          "form-control" +
                          (errors.UpdateEmail && touched.UpdateEmail ? " is-invalid" : "")
                        }
                      />
                      <font color="red">
                        <ErrorMessage
                          name="UpdateEmail"
                          component="div"
                          className="invalid-feedback"
                        />
                      </font>
                      <br/>
                      <Field
                        name="UpdateUser_name"
                        type="text"
                        value={values.UpdateUser_name}
                        onChange={handleChange}
                        placeholder="User name"
                        className={
                          "form-control" +
                          (errors.UpdateUser_name && touched.UpdateUser_name ? " is-invalid" : "")
                        }
                      />
                      <font color="red">
                        <ErrorMessage
                          name="User_name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </font>
                      <br />
                      <div className="form-group">
                      <input id="file" name="file" type="file" onChange={(event) => {
                        setUpdatePhoto(event.target.files[0]);
                      }} className="form-control" />
                    
                    </div>
                      <br />
                      <button
                        className="btn waves-effect waves-light"
                        type="submit"
                        style={{ background: "#3A5B91" }}
                        name="action"
                      >
                        Update data
                      </button>
                      <br />
                      <br />
                      <br />
                    </div>
                  </form>
                  <Link to="/"><button style={{ background:'white',borderColor:'white',marginLeft:'500px',outline:'0' }}>Back</button></Link>
                </div>
              )}
            />
          </div>
        :
        <div className="container login-fix">
        <Formik
          initialValues={{
            first_name:"",
            last_name:"",
            email:"",
            user_name: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            first_name: Yup.string().required("Firstname is required"),
            last_name: Yup.string().required("Lastname is required"),
            email: Yup.string().required("Username is required"),
            user_name: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={(fields) => {
            senddata(fields);
            alert("user register successfuly");
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
                     User Information
                  </h2>
                  <Field
                    name="first_name"
                    type="text"
                    value={values.first_name}
                    onChange={handleChange}
                    placeholder="first name"
                    className={
                      "form-control" +
                      (errors.first_name && touched.first_name ? " is-invalid" : "")
                    }
                  />
                  <font color="red">
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </font>
                  <br />
                  <Field
                    name="last_name"
                    type="text"
                    value={values.last_name}
                    onChange={handleChange}
                    placeholder="Last name"
                    className={
                      "form-control" +
                      (errors.last_name && touched.last_name ? " is-invalid" : "")
                    }
                  />
                  <font color="red">
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </font>
                  <br />
                  <Field
                    name="email"
                    type="text"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="email"
                    className={
                      "form-control" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                  />
                  <font color="red">
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </font>
                  <br/>
                  <Field
                    name="user_name"
                    type="text"
                    value={values.user_name}
                    onChange={handleChange}
                    placeholder="User name"
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
                  <div className="form-group">
                  <input id="file" name="file" type="file" onChange={(event) => {
                    setPhoto(event.target.files[0]);
                  }} className="form-control" />
                
                </div>
                  <Field
                    name="password"
                    id="myInput"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
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
                  <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    style={{ background: "#3A5B91" }}
                    name="action"
                  >
                    Add user
                  </button>
                  <br />
                  <br />
                  <br />
                </div>
              </form>
              <Link to="/"><button style={{ background:'white',borderColor:'white',marginLeft:'500px',outline:'0' }}>Back</button></Link>
            </div>
          )}
        /> 
      </div>
        }
      
    </React.Fragment>
  );
};

function mapDispatchToProps(dispatch) {
    return {
        userRegister: (data, history) => dispatch(userRegister(data, history)),
        userUpdate: (id,data,history) => dispatch(userUpdate(id,data,history)),
    };
}

export default withRouter(connect(null, mapDispatchToProps)(Adduser));