'use server';

import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createProductSchema } from '@/app/(root)/products/create/_schemas';
import { db } from '@/shared/lib/db';

export const createProduct = async (prevState: unknown, formData: FormData) => {
  const validatedFields = createProductSchema.safeParse(Object.fromEntries(formData.entries()));

  if (validatedFields.error) {
    return validatedFields.error.formErrors.fieldErrors;
  }

  const data = validatedFields.data;

  await fs.mkdir('products', { recursive: true });
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir('public/products', { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));

  await db.product.create({
    data: {
      isAvailableForPurchase: true,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  revalidatePath('/');
  revalidatePath('/products');

  redirect('/products');
};
