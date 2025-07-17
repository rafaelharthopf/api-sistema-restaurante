import { Router, Request, Response } from 'express';
import prisma from '../prisma/client';
import { Order } from '@prisma/client';

const router = Router();

router.get('/:companyId', async (req: Request, res: Response) => {
  const companyId = Number(req.params.companyId);

  if (isNaN(companyId)) {
    return res.status(400).json({ error: 'ID de empresa inválido' });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { companyId },
      select: { createdAt: true },
    });

    const vendasPorDia: Record<string, number> = {
      'Dom': 0, 'Seg': 0, 'Ter': 0, 'Qua': 0, 'Qui': 0, 'Sex': 0, 'Sáb': 0,
    };

    orders.forEach(({ createdAt }: Pick<Order, 'createdAt'>) => {
      const dia = createdAt.toLocaleDateString('pt-BR', { weekday: 'short' });
      vendasPorDia[dia] = (vendasPorDia[dia] || 0) + 1;
    });

    const vendasFormatadas = Object.entries(vendasPorDia).map(([dia, vendas]) => ({
      dia,
      vendas,
    }));

    const allOrders = await prisma.order.findMany({
      where: { companyId },
      select: { items: true },
    });

    const itemCount: Record<string, number> = {};

    allOrders.forEach(({ items }: Pick<Order, 'items'>) => {
      items.forEach((item: string) => {
        itemCount[item] = (itemCount[item] || 0) + 1;
      });
    });

    const pratosMaisVendidos = Object.entries(itemCount)
      .map(([nome, vendas]) => ({ nome, vendas }))
      .sort((a, b) => b.vendas - a.vendas)
      .slice(0, 10);

    return res.json({
      vendasPorDia: vendasFormatadas,
      pratosMaisVendidos,
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
