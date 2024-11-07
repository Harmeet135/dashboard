import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HotelHeaTMap from "./heatmap";
import { IoIosArrowBack } from "react-icons/io";

export default function HotelDetails() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Traffic");

  const [hoteldata, sethoteldata] = useState(null);

  useEffect(() => {
    const fetchhoteldata = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/customer-activity/${hotelId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        sethoteldata(data);
      } catch (error) {
        console.error("Error fetching mall data:", error);
      }
    };
    fetchhoteldata();
  }, [hotelId]);

  if (!hoteldata) {
    return <div>Loading...</div>;
  }

   return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8 h-full">
      <div className="flex md:flex-row flex-col items-start justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <IoIosArrowBack />
          </button>
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
            {hoteldata.icon}
          </div>
          <div>
            <h1 className="text-xl font-semibold">{hoteldata.hotel}</h1>
            <p className="text-sm text-gray-500">Customer Activity Data</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">Status</div>
          <span className="text-sm text-green-500">{hoteldata.status}</span>
          <span className="text-sm">{hoteldata.date}</span>
        </div>
      </div>

      <div className="flex space-x-1 border-b">
        {["Traffic", "sales", "customerSatisfaction"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {hoteldata.metrics.map((metric) => (
          <div key={metric.label} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-2">
              <span className="text-xl">{metric.icon}</span>
              <span className="text-sm text-gray-500">{metric.label}</span>
            </div>
            <div className="text-2xl font-bold mt-2">{metric.value}</div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Activity by Mall Zone</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Area
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 Population
                </th>
             
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {hoteldata.zones.map((zone) => (
                <tr key={zone.label}>
                  <td className="px-6 py-4 whitespace-nowrap">{zone.label}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{zone.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <HotelHeaTMap hoteldata={hoteldata} />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Customer Segments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SEGMENT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTIVITY LEVEL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  REVENUE
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hoteldata.segments.map((segment) => (
                <tr key={segment.segment}>
                  <td className="px-6 py-4 whitespace-nowrap">{segment.segment}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{segment.activityLevel}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{segment.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}