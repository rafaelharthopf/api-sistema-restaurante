import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== '65b34eab8b65512dfe5807d654cd9c3e1a72cf06f7a8841c573a28ee3a292de5') {
        return res.status(403).json({ message: 'Acesso negado. API Key inválida ou ausente.' });
    }

    next();
}
