import React from "react";
import error1 from "./img/404.png";
import "./css/404-1.css";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <main className="w-100 h-100 page-wrapper d-flex justify-content-center align-items-center">
      <div className="container mw-100">
        <div className="row justify-content-center text-center">
          <div className="text-tkd col-lg-5 col-md-7 col-sm-9">
            <img className="error1-img" src={error1} alt="404 Error" height={450} width={500} />
            <h1 className="h3 error1-h3">404 error</h1>
            <p className="error1-p">OOPS!</p>
            <p className="font-size-h3 font-weight-normal h5 fw-normal mb-4">Something went wrong here</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="row">
              <div className="col-sm-4 mb-3">
                <Link className="card error1-card" to="/">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <i className="tkd3-home1 h4"></i>
                        <h5 className="fs-sm mb-0">Homepage</h5>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-sm-4 mb-3">
                <Link className="card error1-card" to="/login">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <i className="bi bi-door-open h4"></i>
                        <h5 className="fs-sm mb-0">Login</h5>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-sm-4 mb-3">
                <Link className="card error1-card" to="/registration">
                  <div className="card-body p-0">
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <i className="tkd9-free-board-sign h4"></i>
                        <h5 className="fs-sm mb-0">Registration</h5>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
