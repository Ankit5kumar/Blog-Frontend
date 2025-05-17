import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Table from "../component/Table";

function Dashboard() {

    const navigate = useNavigate();

    

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

  

    return (
        <>
            <Navbar />

            <Table />
        </>
    );
}

export default Dashboard;
