import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: 'Acesso negado. API Key inválida ou ausente.' });
    }

    next();
}
