import React from 'react'
import { useContext } from 'react';
import { FileContext } from '../../contexts/FileContext';

const File = ({ file }) => {
    const isFolder = file.mimeType === 'application/vnd.google-apps.folder' ? true : false;
    const { setParentId, breadcrumbs, setBreadcrumbs, listFiles, deleteFile } = useContext(FileContext);
    const openFolder = (file) => {
        if (isFolder) {
            setParentId(file.id);
            setBreadcrumbs([...breadcrumbs, { folder: file.name, folderId: file.id, active: true }]);
            listFiles(file.id);
        }
    }
    const confirmDelete = (file) => {
        const fileType = isFolder ? 'folder' : 'file';
        if (window.confirm(`Are you sure you want to delete ${fileType} '${file.name}' ?`)) {
            deleteFile(file.id);
        } else {
            console.log('Not deleted');
        }
    }
    return (
        <tr className="table-secondary" key={file.id} onClick={() => openFolder(file)} style={{ cursor: isFolder ? 'pointer' : 'initial' }}>
            <td className="text-center">
                {isFolder ? 'FolderIcon' : 'FileIcon'}
            </td>
            <th>{file.name}</th>
            <td className="text-right">
                {!isFolder && <a href={file.webContentLink} download ><button
                    className="btn btn-dark btn-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    Download
                </button></a>}
                <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(file);
                    }}
                >
                    Delete
                </button>
            </td>
        </tr >
    )
}

export default File