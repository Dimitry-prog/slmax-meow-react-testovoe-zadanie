'use server';

import { db } from '@/shared/lib/db';
import { cache } from '@/shared/lib/utils';

export const getMostPopularProducts = cache(
  async () => {
    const products = await db.product.findMany({
      where: {
        isAvailableForPurchase: true,
      },
      orderBy: {
        priceInCents: 'desc',
      },
      take: 6,
    });

    return products;
  },
  ['/', 'getMostPopularProducts'],
  { revalidate: 60 * 60 * 24 }
);
