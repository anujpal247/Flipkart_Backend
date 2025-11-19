import mongoose from 'mongoose';
import logger from './logger.config';
import { serverConfig } from '.';

async function connectDB() {
  try {
    const dbUrl = serverConfig.MONGODB_URI;
    const connection = await mongoose.connect(dbUrl);
    logger.info('Connected to MongoDB successfully');

    mongoose.connection.on('disconnected', () => {
      logger.info('Disconnected from MongoDB');
    });

    mongoose.connection.on('error', (error) => {
      logger.error('Error connecting to MongoDB:', error);
    });


    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed due to application termination");
      process.exit(0);
    })

    return connection;
    
  } catch (error) {
    logger.error('Database connection error:', error);
    process.exit(1);
  }

}

export default connectDB;