import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getMenuItems = async (req: Request, res: Response) => {
    const menu = await prisma.menu.findMany();
    res.json(menu);
};

export const createMenuItem = async (req: Request, res: Response) => {
    const { name, description, price, category, available, companyId } = req.body;
    const item = await prisma.menu.create({
        data: { name, description, price, category, available, companyId },
    });
    res.json(item);
};
