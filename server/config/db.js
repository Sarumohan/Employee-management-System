const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI || '';
    
    // Automatically sanitize uri by stripping whitespace and quotation marks
    uri = uri.trim().replace(/^["']|["']$/g, '');

    if (!uri) {
      console.error('MongoDB Connection Error: MONGODB_URI environment variable is not defined.');
      return;
    }

    if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
      console.error(
        `MongoDB Connection Error: Invalid URI scheme "${uri.substring(0, 10)}...". Expected string starting with "mongodb://" or "mongodb+srv://".`
      );
      return;
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};

module.exports = connectDB;
