
import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    const URI = process.env.MONGO_URI;
    if (!URI) {
      throw new Error('MONGO_URI is not defined');
    }
    const conn = await mongoose.connect(URI);
    if (conn) {
      console.log(
        `Connected To Mongodb Database ${mongoose.connection.host}`.bgMagenta.white
      );
    }
  } catch (error) {
    console.error('Database connection error:', error);
  }
};


