import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getCompanies = async (req: Request, res: Response) => {
    const companies = await prisma.company.findMany();
    res.json(companies);
};

export const createCompany = async (req: Request, res: Response) => {
    const { name, isActive } = req.body;
    const company = await prisma.company.create({
        data: { name, isActive: isActive ?? true },
    });
    res.json(company);
};

export const updateCompany = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, isActive } = req.body;

    try {
        const company = await prisma.company.update({
            where: { id: Number(id) },
            data: {
                ...(name !== undefined && { name }),
                ...(isActive !== undefined && { isActive }),
            },
        });
        res.json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar empresa' });
    }
};