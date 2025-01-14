import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewPerformanceEmployee = () => {
  const [performances, setPerformances] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [drawings, setDrawings] = useState("");
  const [tasks, setTasks] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedPerformance, setEditedPerformance] = useState({});
  const { user } = useAuth();
  const _id = user._id;

  // Fetch user performances
  const getUserPerformance = async () => {
    try {
      const { data } = await axios.get(
        `https://employee-management-system-backend-objq.onrender.com/api/performance/get-user-performance/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        setPerformances(data.performances);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserPerformance();
  }, []);

  // Add performance
  const handleAddPerformance = async () => {
    try {
      if (!month || !year || !drawings || !tasks) {
        toast.warn("Please fill in all fields.");
        return;
      }

      const { data } = await axios.post(
        `https://employee-management-system-backend-objq.onrender.com/api/performance/add-performance`,
        {
          _id,
          month,
          year,
          drawings,
          tasks,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserPerformance();
      } else {
        toast.error(data.message);
      }
      setMonth("");
      setYear("");
      setDrawings("");
      setTasks("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Start editing
  const handleEditPerformance = (index) => {
    setEditingIndex(index);
    setEditedPerformance({ ...performances[index] });
  };

  // Save edited performance
  const handleSaveEdit = async () => {
    const { _id, drawings, tasks } = editedPerformance;
    try {
      const { data } = await axios.put(
        `https://employee-management-system-backend-objq.onrender.com/api/performance/edit-performance/${_id}`,
        {
          drawings,
          tasks,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setEditingIndex(null);
        getUserPerformance();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete performance
  const handleDeletePerformance = async (_id) => {
    try {
      const { data } = await axios.delete(
        `https://employee-management-system-backend-objq.onrender.com/api/performance/delete-performance/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserPerformance();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update edited performance fields
  const handleEditFieldChange = (field, value) => {
    setEditedPerformance((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <h1 className="text-xl text-gray-800 font-bold text-center mb-8">
            Employee Performance Tracker
          </h1>

          {/* Add Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col">
              <label htmlFor="month" className="text-gray-700 font-medium mb-2">
                Month
              </label>
              <select
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m, index) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="year" className="text-gray-700 font-medium mb-2">
                Year
              </label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Year</option>
                {Array.from(
                  { length: 10 },
                  (_, i) => new Date().getFullYear() + i - 1
                ).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="drawings"
                className="text-gray-700 font-medium mb-2"
              >
                Drawings Submitted
              </label>
              <input
                type="number"
                id="drawings"
                value={drawings}
                onChange={(e) => setDrawings(e.target.value)}
                className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="tasks" className="text-gray-700 font-medium mb-2">
                Tasks Completed
              </label>
              <input
                type="number"
                id="tasks"
                value={tasks}
                onChange={(e) => setTasks(e.target.value)}
                className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={handleAddPerformance}
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
            >
              Add Performance
            </button>
          </div>

          {/* Performance Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-blue-100">
                  <th className="px-4 py-3 text-center border border-gray-300 text-gray-700 font-bold">
                    Month
                  </th>
                  <th className="px-4 py-3 text-center border border-gray-300 text-gray-700 font-bold">
                    Year
                  </th>
                  <th className="px-4 py-3 text-center border border-gray-300 text-gray-700 font-bold">
                    Drawings
                  </th>
                  <th className="px-4 py-3 text-center border border-gray-300 text-gray-700 font-bold">
                    Tasks
                  </th>
                  <th className="px-4 py-3 text-center border border-gray-300 text-gray-700 font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {performances.length > 0 ? (
                  performances.map((performance, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100`}
                    >
                      <td className="px-4 py-2 text-center border border-gray-300">
                        {performance.month}
                      </td>
                      <td className="px-4 py-2 text-center border border-gray-300">
                        {performance.year}
                      </td>
                      <td className="px-4 py-2 text-center border border-gray-300">
                        {editingIndex === index ? (
                          <input
                            type="number"
                            value={editedPerformance.drawings}
                            onChange={(e) =>
                              handleEditFieldChange("drawings", e.target.value)
                            }
                            onWheel={(e) => e.target.blur()}
                            className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          performance.drawings
                        )}
                      </td>
                      <td className="px-4 py-2 text-center border border-gray-300">
                        {editingIndex === index ? (
                          <input
                            type="number"
                            value={editedPerformance.tasks}
                            onChange={(e) =>
                              handleEditFieldChange("tasks", e.target.value)
                            }
                            onWheel={(e) => e.target.blur()}
                            className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          performance.tasks
                        )}
                      </td>
                      <td className="px-4 py-2 text-center border border-gray-300">
                        <div className="flex items-center justify-center space-x-2">
                          {editingIndex === index ? (
                            <button
                              onClick={handleSaveEdit}
                              className="bg-green-500 text-white px-4 py-1 rounded-md shadow hover:bg-green-600 transition"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditPerformance(index)}
                              className="bg-yellow-500 text-white px-4 py-1 rounded-md shadow hover:bg-yellow-600 transition"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleDeletePerformance(performance._id)
                            }
                            className="bg-red-500
                            text-white px-4 py-1 rounded-md shadow hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-3 text-center text-gray-600"
                    >
                      No performance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPerformanceEmployee;