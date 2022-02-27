import React from 'react'
import { useContext, useState } from "react";
import { FileContext } from '../../contexts/FileContext';
import { UserContext } from "../../contexts/UserContext";
import LogoutModal from "./LogoutModal";

const Navbar = () => {
    const { user } = useContext(UserContext);
    const { searchFiles } = useContext(FileContext);
    const [searchTerm, setSearchTerm] = useState('');

    // Logout modal functions
    const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);

    function openLogoutModal() {
        setLogoutModalIsOpen(true);
    }
    function closeLogoutModal() {
        setLogoutModalIsOpen(false);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <span className="navbar-brand">
                    DRIVE<span className="text-muted">APP</span>
                </span>

                <div className="navbar-collapse collapse" id="navbarColor03">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <form className="d-flex">
                                <input className="form-control me-sm-2" type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
                                <button className="btn btn-secondary my-2 my-sm-0" onClick={(e) => { e.preventDefault(); searchFiles(searchTerm) }}>Search</button>
                            </form>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <ul className="navbar-nav">
                            <li className="flexcenter">
                                <div className="rounded-img">
                                    <img
                                        className="profile-img"
                                        alt="profile"
                                        src={user.userProfile.imageUrl}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-secondary text-muted"
                                    onClick={openLogoutModal}
                                >
                                    {user.userProfile.givenName}
                                </button>
                                <LogoutModal logoutModalIsOpen={logoutModalIsOpen} setLogoutModalIsOpen={setLogoutModalIsOpen} openLogoutModal={openLogoutModal} closeLogoutModal={closeLogoutModal} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar