import React from "react";


const Dashboard = () => {


    const cards = [

        {
            title:"Hotels",
            value:"0"
        },

        {
            title:"Bookings",
            value:"0"
        },

        {
            title:"Users",
            value:"0"
        },

        {
            title:"Reviews",
            value:"0"
        },

    ];



    return (

        <div>


            <h1 className="text-3xl font-bold mb-6">
                Dashboard Overview
            </h1>



            <div className="grid md:grid-cols-4 gap-6">


                {cards.map((card)=>(

                    <div

                        key={card.title}

                        className="bg-white p-6 rounded-xl shadow"

                    >

                        <h3 className="text-gray-500">

                            {card.title}

                        </h3>


                        <p className="text-3xl font-bold mt-2">

                            {card.value}

                        </p>


                    </div>

                ))}


            </div>


        </div>

    );


};


export default Dashboard;