import express from "express";
import fs from 'fs';
import cors from 'cors'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
const jsonData = fs.readFileSync('customerdata.json', 'utf8');
const data = JSON.parse(jsonData);

const processedData = data.map(hotel => {
    const totalTimeSpent = hotel.areas.reduce((sum, area) => sum + area.timeSpent, 0);
    const totalMoneySpent = hotel.areas.reduce((sum, area) => sum + area.moneySpent, 0);

    return {
        id : hotel.id,
        hotel: hotel.hotel,
        icon : hotel.icon,
        status : hotel.status ,
        date : hotel.date ,
        budget : hotel.budget ,
        timeline : hotel.timeline ,
        budget : hotel.budget,
        totalTimeSpent,
        totalMoneySpent

    };
});


// Endpoint to serve customer activity data
app.get('/api/customer-activity', (req, res) => {
    res.json({ hotels: processedData });
});

app.get('/api/customer-activity/:hotelId', (req, res) => {
  const { hotelId } = req.params;
  console.log(`Looking for hotel with id: ${hotelId}`); // Debugging log

  // Convert hotelId to an integer to compare it correctly with the data
  const hotel = processedData.find(h => h.id === parseInt(hotelId)); 

  if (hotel) {
      res.json(hotel);
  } else {
      res.status(404).json({ message: 'Hotel not found' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
