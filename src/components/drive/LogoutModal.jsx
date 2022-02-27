import React from 'react';
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ReactModal from "react-modal";
import { GoogleLogout } from "react-google-login";

ReactModal.setAppElement("#root");

const logOutStyles = {
    content: {
        minWidth: "600px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "0px",
        border: "none",
    },
};

const LogoutModal = ({ logoutModalIsOpen, setLogoutModalIsOpen, openLogoutModal, closeLogoutModal }) => {
    const { user, logoutSuccess, logoutFaliure } = useContext(UserContext);

    return (
        <ReactModal
            isOpen={logoutModalIsOpen}
            onRequestClose={closeLogoutModal}
            style={logOutStyles}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Logged in as:{" "}
                            {user.userProfile.givenName +
                                " " +
                                user.userProfile.familyName}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={closeLogoutModal}
                            aria-label="Close"
                        >
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Do you want to log out of DRIVEAPP?
                    </div>
                    <div className="modal-footer">
                        <GoogleLogout
                            clientId="953904536832-f9n1591em77rroae9uokdp439qluifmm.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={logoutSuccess}
                            onFailure={logoutFaliure}
                        />
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={closeLogoutModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </ReactModal>
    )
}

export default LogoutModal