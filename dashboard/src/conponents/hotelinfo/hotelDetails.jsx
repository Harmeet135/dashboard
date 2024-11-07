import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HotelHeaTMap from "./heatmap";
import { IoIosArrowBack } from "react-icons/io";

export default function HotelDetails() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("footTraffic");

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
    <>
    
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8 h-full ">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <button
          onClick={() => navigate(-1)}
          ><IoIosArrowBack />
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
          <span className="text-sm text-green-500">Active</span>
          {/* <div className="text-sm text-gray-500">Created on</div> */}
          <span className="text-sm">{hoteldata.createdOn}</span>
        </div>
      </div>

      <div className="flex space-x-1 border-b">
        {["footTraffic", "sales", "customerSatisfaction"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: "👣", label: "Foot Traffic", value: "500,000" },
          { icon: "💵", label: "Sales Revenue", value: "$1,500,000" },
          { icon: "📊", label: "Customer Satisfaction", value: "89%" },
          { icon: "🛍️", label: "Items Purchased", value: "250,000" },
        ].map((metric) => (
          <div key={metric.label} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-2">
              <span className="text-xl">{metric.icon}</span>
              <span className="text-sm text-gray-500">{metric.label}</span>
            </div>
            <div className="text-2xl font-bold mt-2">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Activity by Mall Zone</h2>
            <button className="text-sm text-blue-500 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Click to refresh
            </button>
          </div>
          <div className="space-y-2">
            {[
              { label: "East Wing", value: "150,000 visits" },
              { label: "West Wing", value: "120,000 visits" },
              { label: "Central Plaza", value: "230,000 visits" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <HotelHeaTMap />

   
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Customer Segments</h2>
          <button className="text-sm text-blue-500">+ Add Segment</button>
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
                  REVENUE GENERATED
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  segment: "Teenagers",
                  activityLevel: "High",
                  revenue: "$300,000",
                },
                {
                  segment: "Families",
                  activityLevel: "Medium",
                  revenue: "$500,000",
                },
                {
                  segment: "Tourists",
                  activityLevel: "Low",
                  revenue: "$100,000",
                },
              ].map((segment) => (
                <tr key={segment.segment}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {segment.segment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {segment.activityLevel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {segment.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Audience Age & Gender</h3>
          <div className="space-y-2">
            {[
              { age: "15-24", male: 40, female: 25 },
              { age: "25-34", male: 35, female: 30 },
              { age: "35-44", male: 25, female: 20 },
              { age: "45-54", male: 15, female: 10 },
              { age: "55-64", male: 10, female: 8 },
              { age: "+64", male: 5, female: 4 },
            ].map((data) => (
              <div key={data.age} className="flex items-center gap-4">
                <div className="w-16 text-sm">{data.age}</div>
                <div className="flex-1 flex gap-2">
                  <div
                    className="h-4 bg-blue-500 rounded"
                    style={{ width: `${data.male}%` }}
                  />
                  <div
                    className="h-4 bg-green-500 rounded"
                    style={{ width: `${data.female}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>

  );
}
