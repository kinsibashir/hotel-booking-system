import React from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";


const AdminLayout = () => {


    return (

        <div className="min-h-screen bg-gray-100 flex">


            <AdminSidebar />


            <div className="flex-1">


                <AdminNavbar />


                <main className="p-6">

                    <Outlet />

                </main>


            </div>


        </div>

    );

};


export default AdminLayout;