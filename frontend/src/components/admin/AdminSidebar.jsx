import React from "react";
import { NavLink } from "react-router-dom";


const AdminSidebar = () => {


    const links = [

        {
            name: "Dashboard",
            path: "/admin"
        },

        {
            name: "Hotels",
            path: "/admin/hotels"
        },

        {
            name: "Rooms",
            path: "/admin/rooms"
        },

        {
            name: "Bookings",
            path: "/admin/bookings"
        },

        {
            name: "Users",
            path: "/admin/users"
        },

        {
            name: "Reviews",
            path: "/admin/reviews"
        },

    ];



    return (

        <aside className="w-64 bg-emerald-700 text-white min-h-screen p-5">


            <h1 className="text-2xl font-bold mb-8">
                StayNest Admin
            </h1>



            <nav className="space-y-3">

                {links.map((link) => (

                    <NavLink

                        key={link.path}

                        to={link.path}

                        className={({isActive}) =>
                            `block px-4 py-3 rounded-lg transition ${
                                isActive
                                ? "bg-white text-emerald-700"
                                : "hover:bg-emerald-600"
                            }`
                        }

                    >

                        {link.name}

                    </NavLink>

                ))}


            </nav>


        </aside>

    );

};


export default AdminSidebar;