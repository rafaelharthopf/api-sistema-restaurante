import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getOrders = async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany();
    res.json(orders);
};

export const createOrder = async (req: Request, res: Response) => {
    const { table, items, status, companyId } = req.body;
    const order = await prisma.order.create({
        data: { table, items, status, companyId },
    });
    res.json(order);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await prisma.order.update({
            where: { id: Number(id) },
            data: { status },
        });
        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar status do pedido' });
    }
};
