import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/product-management';
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        if (error.name === 'MongoServerSelectionError') {
            console.error('无法连接到 MongoDB 服务器，请检查：');
            console.error('1. MongoDB 服务是否正在运行');
            console.error('2. MONGO_URI 是否正确配置');
            console.error('3. 网络连接是否正常');
        }
        process.exit(1);
    }
}