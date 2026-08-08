const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI || '';
    
    // Automatically sanitize uri by stripping whitespace and quotation marks
    uri = uri.trim().replace(/^["']|["']$/g, '');

    // Handle case where "MONGODB_URI=mongodb+srv://..." was pasted into the Value field
    if (uri.includes('=')) {
      const parts = uri.split('=');
      const foundMongoUri = parts.find(
        (p) => p.trim().startsWith('mongodb://') || p.trim().startsWith('mongodb+srv://')
      );
      if (foundMongoUri) {
        uri = foundMongoUri.trim();
      }
    }

    if (!uri) {
      console.error('MongoDB Connection Error: MONGODB_URI environment variable is not defined.');
      return;
    }

    if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
      console.error(
        `MongoDB Connection Error: Invalid URI. Value in Render is currently "${uri}". Expected a connection string starting with "mongodb+srv://" or "mongodb://".`
      );
      return;
    }

    // Auto-fix common URI query parameter issues like retryWrites without =true
    uri = uri.replace(/retryWrites(?!=)/g, 'retryWrites=true');
    uri = uri.replace(/retryWrites=(?=&|$)/g, 'retryWrites=true');

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};

module.exports = connectDB;
