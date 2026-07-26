import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import authService from "../../services/authService";

const Profile = () => {

  const user = authService.getCurrentUser();

  return (
    <DashboardLayout>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl">

        <h2 className="text-3xl font-bold mb-8">

          My Profile

        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div>

            <label className="font-semibold text-gray-500">

              First Name

            </label>

            <p className="mt-2 text-lg">

              {user?.first_name}

            </p>

          </div>

          <div>

            <label className="font-semibold text-gray-500">

              Last Name

            </label>

            <p className="mt-2 text-lg">

              {user?.last_name}

            </p>

          </div>

          <div>

            <label className="font-semibold text-gray-500">

              Email

            </label>

            <p className="mt-2 text-lg">

              {user?.email}

            </p>

          </div>

          <div>

            <label className="font-semibold text-gray-500">

              Phone

            </label>

            <p className="mt-2 text-lg">

              {user?.phone || "Not Provided"}

            </p>

          </div>

          <div>

            <label className="font-semibold text-gray-500">

              Role

            </label>

            <p className="mt-2 text-lg capitalize">

              {user?.role}

            </p>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Profile;