import React from "react";

const Users = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        User Management
      </h1>

      <div className="bg-white rounded-xl shadow p-8">
        <p className="text-gray-500">
          No users available.
        </p>
      </div>
    </div>
  );
};

export default Users;