import { Router } from 'express';
import { getOrders, createOrder, updateOrderStatus } from '../controllers/order.controller';

const router = Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.patch('/:id', updateOrderStatus);

export default router;
