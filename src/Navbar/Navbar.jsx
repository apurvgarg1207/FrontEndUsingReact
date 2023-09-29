import React from "react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-themedark">
            <div className="container p-3">
                <a className="navbar-brand text-themelight bg-themeligh" href="#">
                    {/* Navbar */}
                    <img src={'https://www.mantratec.com/Images/logo/logo.png'} className="image-fluid"/>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link text-themelight" href="" onClick={() => navigate('/app/')}>
                                Home
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link text-themelight" href=""  onClick={()=>navigate('/app/ListTable')}>
                                List-Table
                            </a>
                        </li>
                        <li className="nav-item  dropdown">
                            <a
                                className="nav-link text-themelight  dropdown-toggle"
                                href=""
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Dropdown
                            </a>
                            <div className="dropdown-menu text-themelight bg-themedark" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item text-themelight" href="#">
                                    Action
                                </a>
                                <a className="dropdown-item text-themelight" href="#">
                                    Another action
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item text-themelight" href="#">
                                    Something else here
                                </a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-themelight disabled" href="#">
                                Disabled
                            </a>
                        </li>
                    </ul>
                    <form className="d-flex  ">
                        <input
                            className="form-control text-themedark me-2 text-themedark"
                            
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-themelight" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}
