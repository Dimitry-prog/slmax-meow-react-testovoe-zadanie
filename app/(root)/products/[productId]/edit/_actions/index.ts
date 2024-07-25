'use server';

import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

import { editProductSchema } from '@/app/(root)/products/[productId]/edit/_schemas';
import { db } from '@/shared/lib/db';

export const updateProduct = async (id: string, prevState: unknown, formData: FormData) => {
  const validatedFields = editProductSchema.safeParse(Object.fromEntries(formData.entries()));
  if (validatedFields.error) {
    return validatedFields.error.formErrors.fieldErrors;
  }

  const data = validatedFields.data;
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  let filePath = product.filePath;
  if (data.file != null && data.file.size > 0) {
    await fs.unlink(product.filePath);
    filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
  }

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));
  }

  await db.product.update({
    where: { id },
    data: {
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
