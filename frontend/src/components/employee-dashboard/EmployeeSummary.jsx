import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext"; // Assuming you have an authentication context
import axios from "axios"; // Assuming you're using Axios to make API calls
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import userImg from "../../assets/user.jpg";

const EmployeeSummary = () => {
  const { user } = useAuth(); // Get the logged-in user from context
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // Fetch employee details from backend
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `https://employee-management-system-backend-objq.onrender.com/api/employees/summary/${user._id}`, // Fetching employee data by logged-in user's ID
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setEmployee(response.data.employee);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, [user]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (!employee) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <>
      <Header/>
      <div className="w-full mx-auto bg-white shadow-lg rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* Employee Photo */}
          <div className="flex-shrink-0">
            <img
              src={`https://employee-management-system-backend-objq.onrender.com/${employee.userId.profileImage}`}
              alt={employee.name}
              onError={(e) => (e.target.src = userImg)} // Fallback image
              className="w-56 h-56 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
          </div>

          {/* Employee Information */}
          <div className="flex-grow">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {employee.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.employeeId}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Personal Email</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.email}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Korus Email</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.korusEmail || "NA"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-xl font-semibold text-gray-700">
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(employee.dob))}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.gender || "NA"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Marital Status</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.maritalStatus || "NA"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Designation</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.designation || "NA"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Department</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.department?.departmentName || "NA"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">HOD</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.hod || "NA"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Qualification</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.qualification || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Year of Passing</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.yop || "NA"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Contact No.</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.contactNo || "NA"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Alternate Contact No.</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.altContactNo || "NA"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-xl font-semibold text-gray-700">
                  {capitalizeFirstLetter(employee.role) || "NA"}
                </p>
              </div>

              {/* New Fields */}
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Aadhar No.</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.aadharNo || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">PAN No.</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.pan || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Passport No.</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.passportNo || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Passport Type</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.passportType || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Passport Place of Issue</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.passportpoi || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Passport Date of Issue</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.passportdoi
                    ? new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(employee.passportdoi))
                    : "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Passport Date of Expiry</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.passportdoe
                    ? new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(employee.passportdoe))
                    : "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Nationality</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.nationality || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">UAN No.</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.uan || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">EPF No.</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.pfNo || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">ESI No.</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.esiNo || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Bank Name</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.bank || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Bank Branch Name</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.branch || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Bank IFSC Code</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.ifsc || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Account No.</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.accountNo || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Reporting Person</p>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.repperson || "NA"}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Date of Joining</p>
                <p className="text-xl font-semibold text-gray-700">
                  {new Date(employee.doj).toDateString() || "NA"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EmployeeSummary;
