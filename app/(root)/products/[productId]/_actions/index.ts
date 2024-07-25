'use server';

import { db } from '@/shared/lib/db';

export const getProductById = async (id: string) => {
  const product = await db.product.findUnique({ where: { id } });

  return product;
};
