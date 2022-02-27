import React from 'react';
import { useContext, useState } from "react";
import { FileContext } from "../../contexts/FileContext";
import Breadcrumbs from './Breadcrumbs';
import File from './File';

const MyDrive = () => {
    const { files } = useContext(FileContext);
    console.log(files);
    return (
        <div className="container">
            <Breadcrumbs />
            <table className="table table-hover" id="events_table">
                <tbody>
                    {files.map(file => <File file={file} key={file.id} />)}
                </tbody>
            </table>
        </div>
    )
}

export default MyDrive