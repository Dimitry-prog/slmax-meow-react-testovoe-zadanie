'use server';

import { db } from '@/shared/lib/db';
import { cache } from '@/shared/lib/utils';

export const getNewestProducts = cache(async () => {
  const products = await db.product.findMany({
    where: {
      isAvailableForPurchase: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 6,
  });

  return products;
}, ['/', 'getNewestProducts']);
