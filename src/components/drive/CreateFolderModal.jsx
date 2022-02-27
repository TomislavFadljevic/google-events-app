import React, { useState, useContext } from 'react'
import ReactModal from 'react-modal'
import { FileContext } from "../../contexts/FileContext";

ReactModal.setAppElement("#root");

const addEventStyles = {
    content: {
        width: "500px",
        height: "650px",
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

const CreateFolderModal = ({ parentId, folderModalIsOpen, setFolderModalIsOpen }) => {

    const [folderName, setFolderName] = useState("");
    const { createFolder } = useContext(FileContext);

    function closeAddFolderModal() {
        setFolderModalIsOpen(false);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // Add event to google calendar
        createFolder(parentId, folderName);
        // Close modal
        closeAddFolderModal();
    };
    return (
        <ReactModal
            isOpen={folderModalIsOpen}
            onRequestClose={closeAddFolderModal}
            style={addEventStyles}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add new folder</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={closeAddFolderModal}
                            aria-label="Close"
                        >
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="col-form-label col-form-label-sm mt-4">
                                    Folder name
                                </label>
                                <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    placeholder="Enter name"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <input
                                    type="submit"
                                    className="btn btn-primary btn-sm"
                                    value="Add"
                                />
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-sm"
                                    onClick={closeAddFolderModal}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ReactModal>
    )
}

export default CreateFolderModal