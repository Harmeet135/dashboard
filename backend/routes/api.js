import express from 'express';
import { getProcessedData } from '../dataProcessor.js';

const router = express.Router();
const processedData = getProcessedData();

router.get('/customer-activity', (req, res) => {
  const totalCampaignCount = processedData.reduce((sum, hotel) => sum + hotel.totalCampaign, 0);

  res.json({
    totalCampaign: totalCampaignCount,
    hotels: processedData
  });
});

router.get('/customer-activity/:hotelId', (req, res) => {
  const { hotelId } = req.params;
  console.log(`Looking for hotel with id: ${hotelId}`);

  const hotel = processedData.find(h => h.id === parseInt(hotelId)); 

  if (hotel) {
    res.json(hotel);
  } else {
    res.status(404).json({ message: 'Hotel not found' });
  }
});

export default router;
