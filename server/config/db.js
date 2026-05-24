import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (uri) {
      console.log(`📡 Connecting to MongoDB URI: ${uri.replace(/:([^@]+)@/, ':****@')}`);
    } else {
      console.log(`📡 Connecting to MongoDB URI: undefined`);
    }
    const conn = await mongoose.connect(uri || 'mongodb://127.0.0.1:27017/routinerush');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
