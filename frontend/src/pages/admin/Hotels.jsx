import React from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Hotels = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hotels Management</h1>

        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg flex items-center gap-2">
          <FaPlus />
          Add Hotel
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="p-4 text-left">Hotel</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Price/Night</th>
              <th className="p-4 text-left">Rating</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-4">No hotels available</td>
              <td className="p-4">-</td>
              <td className="p-4">-</td>
              <td className="p-4">-</td>

              <td className="p-4 flex justify-center gap-4">
                <button className="text-blue-600">
                  <FaEdit />
                </button>

                <button className="text-red-600">
                  <FaTrash />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hotels;