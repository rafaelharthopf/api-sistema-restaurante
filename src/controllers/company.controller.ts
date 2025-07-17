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
