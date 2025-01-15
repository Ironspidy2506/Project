import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const ViewAllFixedAllowances = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [allowanceHistory, setAllowanceHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);

  // Merge records with the same empId, allowanceMonth, and allowanceYear
  const mergeAllowanceRecords = (data) => {
    const merged = {};

    data.forEach((record) => {
      const key = `${record.employeeId.employeeId}-${record.allowanceMonth}-${record.allowanceYear}`;

      if (!merged[key]) {
        merged[key] = { ...record };
        // Initialize fields that might need to be turned into arrays
        Object.keys(record).forEach((field) => {
          if (["allowanceType", "allowanceAmount", "status"].includes(field)) {
            merged[key][field] = [record[field]];
          }
        });
      } else {
        // Merge fields into arrays for duplicates
        Object.keys(record).forEach((field) => {
          if (["allowanceType", "allowanceAmount", "status"].includes(field)) {
            merged[key][field].push(record[field]);
          }
        });
      }
    });

    return Object.values(merged);
  };

  // Fetch allowance history data
  useEffect(() => {
    const fetchAllowanceData = async () => {
      try {
        const response = await axios.get(
          `https://employee-management-system-backend-objq.onrender.com/api/allowances/fetchAllHistory`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const mergedData = mergeAllowanceRecords(response.data);
        setAllowanceHistory(mergedData);
        setFilteredHistory(mergedData);
      } catch (error) {
        console.error("Error fetching allowance data:", error);
      }
    };
    fetchAllowanceData();
  }, [user._id]);

  // Handle search by Employee ID
  const handleSearch = (e) => {
    const value = e.target.value;

    if (value) {
      // Convert value to number if it's not empty
      const numericValue = Number(value);

      const filtered = allowanceHistory.filter(
        (allowance) => allowance?.employeeId?.employeeId === numericValue
      );

      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(allowanceHistory);
    }
  };

  const handleAddAllowance = () => {
    navigate(`/${user.role}-dashboard/fixed-allowances/add-allowances`);
  };

  const handleEditAllowance = () => {
    navigate(`/${user.role}-dashboard/fixed-allowances/edit-allowances`);
  };

  const handleApproveAllowance = () => {
    navigate(`/${user.role}-dashboard/fixed-allowances/approve-allowances`);
  };

  return (
    <div className="p-6 space-y-6 bg-white">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-col justify-between gap-4 rounded-sm shadow-md p-5">
        <input
          type="search"
          placeholder="Search by Employee ID"
          className="w-full md:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleSearch}
        />
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleAddAllowance}
          >
            Add Allowance
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            onClick={handleEditAllowance}
          >
            Edit Allowance
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={handleApproveAllowance}
          >
            Approve Allowance
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Allowance History</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                S. No.
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Emp ID
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Emp Name
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Allowance Month
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Allowance Year
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Bonus
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                LTC
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Loyalty Bonus
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((allowance, index) => {
              // Create a map of allowance types to amounts for easier access
              const allowanceMap = {};
              if (
                allowance.allowanceType &&
                allowance.allowanceAmount &&
                allowance.status
              ) {
                allowance.allowanceType.forEach((type, idx) => {
                  // Check if the allowance status is "approved"
                  if (allowance.status[idx] === "approved") {
                    // Add the allowance amount to the map for the corresponding type
                    const key = type.toLowerCase();
                    allowanceMap[key] =
                      (allowanceMap[key] || 0) + allowance.allowanceAmount[idx];
                  }
                });
              }

              return (
                <tr key={allowance._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-center text-sm text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-center text-sm text-gray-800">
                    {allowance.employeeId.employeeId}
                  </td>
                  <td className="px-4 py-2 text-center text-sm text-gray-800">
                    {allowance.employeeId.name}
                  </td>
                  <td className="px-4 py-2 text-center text-sm text-gray-800">
                    {allowance.allowanceMonth}
                  </td>
                  <td className="px-4 py-2 text-center text-sm text-gray-800">
                    {allowance.allowanceYear}
                  </td>

                  <td className="px-4 py-2 text-center text-sm text-gray-800">
                    {allowanceMap["bonus"] || allowance.bonus || 0}
                  </td>

                  <td className="px-4 py-2 text-center text-sm text-gray-800">
                    {allowanceMap["ltc"] || allowance.ltc || 0}
                  </td>

                  <td className="px-4 py-2 text-center text-sm text-gray-800">
                    {allowanceMap["loyaltybonus"] ||
                      allowance.loyaltyBonus ||
                      0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllFixedAllowances;