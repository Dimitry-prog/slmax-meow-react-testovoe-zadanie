'use server';

import { db } from '@/shared/lib/db';
import { cache } from '@/shared/lib/utils';

export const getProducts = cache(async () => {
  const products = await db.product.findMany({
    where: {
      isAvailableForPurchase: true,
    },
  });

  return products;
}, ['/products', 'getProducts']);
