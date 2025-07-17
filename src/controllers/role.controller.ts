import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getRoles = async (req: Request, res: Response) => {
    const roles = await prisma.role.findMany();
    res.json(roles);
};
