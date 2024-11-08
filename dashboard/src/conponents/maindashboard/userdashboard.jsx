import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export default function Userdashboard() {
  const navigate = useNavigate();
  const [hotelsVisisted, setHotelsVisisted] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/customer-activity/`)
      .then((response) => {
        console.log(response.data.hotels.length)
        setHotelsVisisted(response.data.hotels);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Hotels List</h1>
          <p className="text-sm text-gray-500">
            See  the weekly insight of the hotels registered have
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          <span className="mr-2">+</span>
          Add Hotel
        </button>
      </div>
      {hotelsVisisted.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              title: "Total Hotels",
              value: hotelsVisisted.length,
              icon: "🔍",
              color: "blue",
            },
            {
              title: "Active Hotels",
              value: hotelsVisisted.length,
              icon: "🔥",
              color: "orange",
            },
            { title: "Pause Hotels", value: 0, icon: "⏸️", color: "yellow" },
            { title: "Terminate Hotels", value: 0, icon: "❌", color: "red" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className={`p-2 bg-${item.color}-100 rounded-lg`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div>
                  <div className="text-sm text-gray-500">{item.title}</div>
                  <div className="text-2xl font-bold">{item.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading data...</p>
      )}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          className="border rounded-md px-3 py-2 max-w-xs"
          placeholder="Search"
          type="search"
        />
        <div className="flex gap-4">
          {["Period", "Status", "Social Media"].map((filter) => (
            <select
              key={filter}
              className="border rounded-md px-3 py-2 bg-white"
              defaultValue=""
            >
              <option value="" disabled>
                {filter}
              </option>
              <option value="all">All</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3">Hotels</th>
              <th className="text-left p-3">Total Spent</th>
              <th className="text-left p-3">People Visited</th>
              <th className="text-left p-3">TIMELINE</th>
              <th className="text-left p-3 md:block hidden">INFLUENCER</th>
              <th className="text-left p-3">Weekly Insight</th>
            </tr>
          </thead>
          <tbody>
            {hotelsVisisted.map((campaign) => (
              <tr key={campaign.hotel} className="border-b">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                      {campaign.icon}
                    </div>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {campaign.hotel}
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            campaign.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {campaign.date}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3">${campaign.totalMoneySpent}</td>
                <td className="p-3">{campaign.totalPeopleVisited}</td>
                <td className="p-3">{campaign.timeline}</td>
                <td className="p-3 md:block hidden">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-medium"
                      >
                        U{i}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="p-3">
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => navigate(`/campaigns/${campaign.id}`)}
                  >
                    <IoIosArrowForward />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
