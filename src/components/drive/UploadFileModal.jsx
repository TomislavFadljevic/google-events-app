import React, { useContext } from "react";
import ReactModal from "react-modal";
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

const UploadFileModal = ({ filesContent, fileModalOpen, setFileModalOpen }) => {
  console.log('isitopen', fileModalOpen);
  const { uploadFile, parentId } = useContext(FileContext);

  function closeAddFileModal() {
    setFileModalOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadFile(filesContent[0], parentId);
    // Close modal
    closeAddFileModal();
  };

  return (
    <ReactModal
      isOpen={fileModalOpen}
      onRequestClose={closeAddFileModal}
      style={addEventStyles}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add new file</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeAddFileModal}
              aria-label="Close"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="files">
                {filesContent.length > 0 && <div className="file">{filesContent[0].name}</div>}
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
                  onClick={closeAddFileModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default UploadFileModal;
