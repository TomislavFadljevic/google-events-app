import { useContext, useState } from "react";
import { FileContext } from "../../contexts/FileContext";
import { UserContext } from "../../contexts/UserContext";
import Navbar from "../drive/Navbar";
import MyDrive from "./MyDrive";

const Drive = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            <Navbar />
            <MyDrive />
        </>
    );
};

export default Drive;
