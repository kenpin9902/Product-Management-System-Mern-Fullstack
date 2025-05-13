import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/product-management';
        
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        const conn = await mongoose.connect(mongoURI, options);
        
        // 监听数据库连接事件
        mongoose.connection.on('connected', () => {
            console.log('MongoDB 连接成功');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB 连接错误:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB 连接断开');
        });

        // 优雅关闭
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB 连接已关闭');
            process.exit(0);
        });

        return conn;
    } catch (error) {
        console.error('MongoDB 连接错误:', error.message);
        if (error.name === 'MongoServerSelectionError') {
            console.error('无法连接到 MongoDB 服务器，请检查：');
            console.error('1. MongoDB 服务是否正在运行');
            console.error('2. MONGO_URI 是否正确配置');
            console.error('3. 网络连接是否正常');
        }
        process.exit(1);
    }
}