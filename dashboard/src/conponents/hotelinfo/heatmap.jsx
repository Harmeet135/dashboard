import { useState, useEffect } from "react"

const getOpacityClass = (value) => {
  if (value >= 80) return "bg-blue-500/90"
  if (value >= 60) return "bg-blue-500/70"
  if (value >= 40) return "bg-blue-500/50"
  if (value >= 20) return "bg-blue-500/30"
  return "bg-blue-500/10"
}

export default function HotelHeatMap({ hoteldata }) {
  const [tooltip, setTooltip] = useState({ show: false, content: "", x: 0, y: 0 })
  const [mostActiveArea, setMostActiveArea] = useState(null)
  const [leastActiveArea, setLeastActiveArea] = useState(null)

  const hotelAreas = hoteldata?.areas || []

  useEffect(() => {
    if (hotelAreas.length > 0) {
      const sortedAreas = [...hotelAreas].sort((a, b) => b.activityLevel - a.activityLevel)
      setMostActiveArea(sortedAreas[0])
      setLeastActiveArea(sortedAreas[sortedAreas.length - 1])
    }
  }, [hotelAreas])

  const handleMouseEnter = (e, area, activityLevel) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTooltip({
      show: true,
      content: `${area}: ${activityLevel}% Activity`,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
    })
  }

  const handleMouseLeave = () => {
    setTooltip({ show: false, content: "", x: 0, y: 0 })
  }

  return (
    <>

<div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-6">
        {mostActiveArea && (
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-xs text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">🔥</span>
              <span className="text-sm text-gray-500">Most Active Area</span>
            </div>
            <div className="text-2xl font-bold">{mostActiveArea.area}</div>
            <p className="text-sm text-gray-500 mt-1">Activity Level: {mostActiveArea.activityLevel}%</p>
          </div>
        )}
        {leastActiveArea && (
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-xs text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">❄️</span>
              <span className="text-sm text-gray-500">Least Active Area</span>
            </div>
            <div className="text-2xl font-bold">{leastActiveArea.area}</div>
            <p className="text-sm text-gray-500 mt-1">Activity Level: {leastActiveArea.activityLevel}%</p>
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Hotel's Activity Heatmap</h2>
            <p className="text-sm text-gray-600">Customer activity levels across different areas</p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {hotelAreas.map(({ area, activityLevel }, index) => (
              <div
                key={index}
                className={`h-24 rounded-lg p-2 flex items-center justify-center text-sm font-medium text-gray-800 cursor-pointer transition-all duration-200 hover:scale-105 ${getOpacityClass(
                  activityLevel
                )}`}
                onMouseEnter={(e) => handleMouseEnter(e, area, activityLevel)}
                onMouseLeave={handleMouseLeave}
              >
                {area}
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

     
    </>
  )
}
