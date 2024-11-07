"use client"

import { useState } from "react"

// Sample data for hotel areas and their activity levels
const hotelData = [
  ["Lobby", "Restaurant", "Bar", "Pool" ,
  "Gym", "Spa", "Garden", "Parking",
  "Conference A", "Conference B", "Business Center", "Gift Shop"],
]

const activityLevels = {
  "Lobby": 85,
  "Restaurant": 65,
  "Bar": 45,
  "Pool": 70,
  "Gym": 30,
  "Spa": 40,
  "Garden": 25,
  "Parking": 50,
  "Conference A": 55,
  "Conference B": 35,
  "Business Center": 20,
  "Gift Shop": 15,
}

// Function to get background color opacity based on activity level
const getOpacityClass = (value) => {
  if (value >= 80) return "bg-blue-500/90"
  if (value >= 60) return "bg-blue-500/70"
  if (value >= 40) return "bg-blue-500/50"
  if (value >= 20) return "bg-blue-500/30"
  return "bg-blue-500/10"
}

export default function HotelHeaTMap() {
  const [tooltip, setTooltip] = useState({ show: false, content: "", x: 0, y: 0 })

  const handleMouseEnter = (e, area) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({
      show: true,
      content: `${area}: ${activityLevels[area]}% Activity`,
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY - 400,
    })
  }

  const handleMouseLeave = () => {
    setTooltip({ show: false, content: "", x: 0, y: 0 })
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Hotel Activity Heatmap</h2>
          <p className="text-sm text-gray-600">Customer activity levels across different areas</p>
        </div>

        <div className="grid gap-4">
  {hotelData.map((row, rowIndex) => (
    <div key={rowIndex} className="grid grid-cols-3 md:grid-cols-4 gap-4">
      {row.map((area, index) => (
        <div
          key={area}
          className={`h-24 rounded-lg p-2 flex items-center justify-center text-sm font-medium text-gray-800 cursor-pointer transition-all duration-200 hover:scale-105 ${getOpacityClass(
            activityLevels[area]
          )}`}
          onMouseEnter={(e) => handleMouseEnter(e, area)}
          onMouseLeave={handleMouseLeave}
        >
          {area}
        </div>
      ))}
    </div>
  ))}
</div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <span className="text-sm text-gray-600">Low Activity</span>
          <div className="h-2 w-32 bg-gradient-to-r from-blue-500/10 to-blue-500/90 rounded-full" />
          <span className="text-sm text-gray-600">High Activity</span>
        </div>
      </div>

      {tooltip.show && (
        <div
          className="fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 40}px`,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  )
}