import { Request, Response } from 'express';
import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';

export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, companyId, roleId, isAdmin = false, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Senha é obrigatória.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, companyId, roleId, isAdmin, password: hashedPassword },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
};
