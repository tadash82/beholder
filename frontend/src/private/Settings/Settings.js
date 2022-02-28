import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { getSettings, updateSettings } from "../../services/SettingsService";
//import { doLogout } from '../../services/AuthServices';
import Menu from "../../components/Menu/Menu";
import Symbols from "./Symbols";

function Settings() {
  const inputEmail = useRef("");
  const inputNewPassword = useRef("");
  const inputConfirmPassword = useRef("");
  const inputApiUrl = useRef("");
  const inputStreamUrl = useRef("");
  const inputAccessKey = useRef("");
  const inputSecretKey = useRef("");

  const history = useHistory();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    getSettings(token)
      .then((settings) => {
        inputEmail.current.value = settings.email;
        // console.log(settings.email)
        inputApiUrl.current.value = settings.apiUrl;
        inputStreamUrl.current.value = settings.streamUrl;
        // console.log(settings.apiUrl);
        inputAccessKey.current.value = settings.accessKey;
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          return history.push("/");
        }
        console.error(err.message);
        if (err.response) {
          setError(err.response.data);
        } else setError(err.message);
      });
  }, [history]);

  /* function onLogoutClick() {
    const token = localStorage.getItem('token')
    doLogout(token)
      .then(response => {
        localStorage.removeItem('token');
        history.push('/');
      })
      .catch(err => {
        console.error(err);
      })
    localStorage.removeItem('token')
  }; */

  function onFormSubmit(event) {
    event.preventDefault();
    if (
      (inputNewPassword.current.value || inputConfirmPassword.current.value) &&
      inputNewPassword.current.value !== inputConfirmPassword.current.value
    ) {
      return setError(
        "The fields New Password and Confirm Password must be equals"
      );
    }

    const token = localStorage.getItem("token");
    updateSettings(
      {
        email: inputEmail.current.value,
        password: inputNewPassword.current.value
          ? inputConfirmPassword.current.value
          : null,
        apiUrl: inputApiUrl.current.value,
        streamUrl: inputStreamUrl.current.value,
        accessKey: inputAccessKey.current.value,
        secretKey: inputSecretKey.current.value
          ? inputSecretKey.current.value
          : null,
      },
      token
    )
      .then((result) => {
        if (result) {
          setError("");
          setSuccess(`Settingsupdated successfully!`);
          inputSecretKey.current.value = "";
          inputNewPassword.current.value = "";
          inputConfirmPassword.current.value = "";
        } else {
          setSuccess("");
          setError(`Can't update the settings!!`);
        }
      })
      .catch((error) => {
        setSuccess("");
        console.error(error.message);
        setError(`Can't update the settings!!`);
      });
  }

  return (
    <React.Fragment>
      <Menu />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-now-rap align-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h1 className="h4">Settings</h1>
          </div>
          <div className="col-12">
            <div className="card card-body border-0 shadow mb-4">
              <h2 className="h5 mb-4">General info</h2>
              <form onSubmit={onFormSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        ref={inputEmail}
                        className="form-control"
                        id="email"
                        type="email"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        ref={inputNewPassword}
                        className="form-control"
                        id="newPassword"
                        type="password"
                        placeholder="Enter your new Passowrd"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        ref={inputConfirmPassword}
                        className="form-control"
                        id="confirmPassword"
                        type="password"
                        placeholder="Your new password again"
                      />
                    </div>
                  </div>
                </div>
                <h2 className="h5 my-4">Exchange Info</h2>
                <div className="row">
                  <div className="col-sm-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="apiUrl">API URL</label>
                      <input
                        ref={inputApiUrl}
                        type="text"
                        className="form-control"
                        id="apiUrl"
                        placeholder="Enter the API URL"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="streamUrl">STREAM URL</label>
                      <input
                        ref={inputStreamUrl}
                        type="text"
                        className="form-control"
                        id="streamUrl"
                        placeholder="Enter the STREAM URL"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="accessKey">Access Key</label>
                      <input
                        ref={inputAccessKey}
                        type="text"
                        className="form-control"
                        id="accessKey"
                        placeholder="Enter the Access Key"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="secretKey">New Secret Key</label>
                      <input
                        ref={inputSecretKey}
                        type="password"
                        className="form-control"
                        id="secretKey"
                        placeholder="Enter the Secret Key"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                    <div className="col-sm-3">
                      <button
                        className="btn btn-gray-800 mt-2 animate-up-2"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                {error ? (
                  <div className="alert alert-danger mt-2 col-4 py-2 ">
                    {error}
                  </div>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
                {success ? (
                  <div className="alert alert-success mt-2 col-4 py-2">
                    {success}
                  </div>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
              </form>
            </div>
          </div>
        </div>
        <Symbols />
      </main>
    </React.Fragment>
  );
}

export default Settings;
