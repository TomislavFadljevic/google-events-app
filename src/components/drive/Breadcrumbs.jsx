import React, { useState, useContext } from 'react'
import { FileContext } from '../../contexts/FileContext'
import CreateFolderModal from './CreateFolderModal'
import { useFilePicker } from 'use-file-picker';
import UploadFileModal from './UploadFileModal';

const Breadcrumbs = () => {
    const { parentId, breadcrumbs, setBreadcrumbs, listFiles } = useContext(FileContext);
    const [openFileSelector, { filesContent }] = useFilePicker({
        multiple: false
    });
    // Add folder modal functions
    const [folderModalIsOpen, setFolderModalIsOpen] = useState(false);
    function openAddFolderModal() {
        setFolderModalIsOpen(true);
    }
    // Add file modal functions
    const [fileModalOpen, setFileModalOpen] = useState(false);
    function openAddFileModal() {
        setFileModalOpen(true);
    }

    function navigateToFolder(crumb) {
        // Set breadcrumbs
        var crumbPosition = breadcrumbs.map(function (x) { return x.folderId; }).indexOf(crumb.folderId);
        const crumbz = breadcrumbs.filter((crumb, i) => i <= crumbPosition)
        setBreadcrumbs(crumbz);
        listFiles(crumb.folderId);
    }

    return (
        <div className='d-flex' style={{ justifyItems: 'center', alignItems: 'center', justifyContent: 'space-between', padding: '15px' }}>
            <div>
                <ol className="breadcrumb" style={{ margin: '0' }}>
                    {breadcrumbs.map((breadcrumb, i) => (
                        <li className="breadcrumb-item" key={i} style={{ cursor: 'pointer' }}><span onClick={(e) => {
                            e.stopPropagation();
                            navigateToFolder(breadcrumb)
                        }}>{breadcrumb.folder}</span></li>
                    ))}
                </ol>
            </div>
            <div>
                <button
                    className="btn btn-dark btn-sm"
                    onClick={() => { openAddFileModal(); openFileSelector(); }}
                    style={{ marginRight: "5px" }}
                >
                    Add file
                </button>
                <UploadFileModal filesContent={filesContent} fileModalOpen={fileModalOpen} setFileModalOpen={setFileModalOpen} />
                <button
                    className="btn btn-dark btn-sm"
                    onClick={() => openAddFolderModal()}
                >
                    Add folder
                </button>
                <CreateFolderModal parentId={parentId} folderModalIsOpen={folderModalIsOpen} setFolderModalIsOpen={setFolderModalIsOpen} />
            </div>
        </div >
    )
}

export default Breadcrumbs