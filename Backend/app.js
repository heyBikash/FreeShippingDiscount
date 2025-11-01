const express = require('express');
const cors = requires("cors");
const app = express();
const dotenv = require('dotenv');
dotenv.config();    
const connectToDatabase = require('./config/db');
const freeShippingBarRoutes = require('./routes/FSB.route');
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// test route
app.get("/test", (req, res) => {
  res.send("API is working properly");
});

// routes 
app.use("/",freeShippingBarRoutes);

// app listen
app.listen(PORT, async () => {
  try{
    console.log(`Server is running on port ${PORT}`);
    await connectToDatabase();
  }
  catch(error){
    console.error('Failed to start server:', error);
  } 
});