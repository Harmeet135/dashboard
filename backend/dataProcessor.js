import fs from 'fs';

export function getProcessedData() {
    const jsonData = fs.readFileSync('customerdata.json', 'utf8');
    const data = JSON.parse(jsonData);
    

  return data.map(hotel => {
    const totalTimeSpent = hotel.areas.reduce((sum, area) => sum + area.timeSpent, 0);
    const totalMoneySpent = hotel.segments.reduce((sum, segment) => sum + (segment.revenue || 0), 0);
    const totalPeopleVisited = hotel.zones.reduce((sum, zone) => sum + (zone.value || 0), 0);
    
    return {
      id: hotel.id,
      hotel: hotel.hotel,
      icon: hotel.icon,
      areas: hotel.areas,
      status: hotel.status,
      date: hotel.date,
      budget: hotel.budget,
      timeline: hotel.timeline,
      activeCampaign : hotel.activeCampaign,
      pauseCampaign : hotel.pauseCampaign,
      terminateCampaign : hotel.pauseCampaign,
      totalCampaign : hotel.totalCampaign,
      totalMoneySpent,
      totalPeopleVisited,
      metrics: hotel.metrics,
      zones: hotel.zones,
      segments: hotel.segments,
      ageGenderDistribution: hotel.ageGenderDistribution,
      activityLevels: hotel.activityLevels
    };
  });
}
