import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import companyRoutes from './routes/company.routes';
import menuRoutes from './routes/menu.routes';
import orderRoutes from './routes/order.routes';
import roleRoutes from './routes/role.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import reportsRouter from './routes/reports.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE'],
  credentials: true,
}));


// Rotas
app.use('/companies', companyRoutes);
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);
app.use('/roles', roleRoutes);
app.use('/users', userRoutes);
app.use('/login', authRoutes);
app.use('/reports', reportsRouter);

export default app;
