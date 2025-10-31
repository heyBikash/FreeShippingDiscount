const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODBURI);
    console.log('Sucessfully: Connected to MongoDB database');
  } catch (error) {
    console.error('Error connecting to MongoDB database:', error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;