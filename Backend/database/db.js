import mongoose from 'mongoose';

const DatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // const db = mongoose.connection;

    // db.on('error', (err) => {
    //   console.error('MongoDB connection error:', err);
    // });

    // db.once('open', () => {
    //   console.log('Connected to MongoDB');
    // });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

export default DatabaseConnection;
