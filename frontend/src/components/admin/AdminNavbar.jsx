import React from "react";
import { useAuth } from "../../context/AuthContext";


const AdminNavbar = () => {


    const { user, logout } = useAuth();



    return (

        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">


            <h2 className="text-xl font-semibold">
                Admin Dashboard
            </h2>



            <div className="flex items-center gap-4">


                <span className="text-gray-600">

                    {user?.first_name} {user?.last_name}

                </span>



                <button

                    onClick={logout}

                    className="bg-red-500 text-white px-4 py-2 rounded-lg"

                >

                    Logout

                </button>


            </div>


        </header>

    );

};


export default AdminNavbar;