import React, { Component } from 'react'
import { NavLink, Link } from "react-router-dom";
import LogoImg from "../../img/logo3.png";

export default class Header extends Component {
    render() {
        const activeStyle = { color: "#F15B2A" };
        // const { login, logout, userHasScopes } = this.props.auth;
        return (
            <nav className="navbar navbar-expand-lg bg-white fixed-top">
                <Link to="/" className="navbar-brand" >Bhagavad Gita</Link>
                <img className="img-fluid" src={LogoImg} alt="card-img" height={20} width={40} />
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto navbar-right-top">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" activestyle={activeStyle}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link" activestyle={activeStyle}>About</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link onClick={isAuthenticated() ? logout : login} className="nav-link" activestyle={activeStyle}>  {isAuthenticated() ? "Log Out" : "Log In"}</Link>
                        </li> */}
                    </ul>
                </div>
            </nav>

        );
    }
}
