import express from 'express';
import {connectDB} from './lib/db.js';
import dotenv from 'dotenv';
import productRoutes from './routes/product.route.js';
import cors from 'cors';

dotenv.config();

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/products', productRoutes);

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: '服务器内部错误',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 404 处理
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: '请求的资源不存在'
    });
});

const PORT = process.env.PORT || 5000;

// 先连接数据库，再启动服务器
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`服务器运行在端口 ${PORT}`);
        });
    } catch (error) {
        console.error('服务器启动失败:', error);
        process.exit(1);
    }
};

startServer();
