'use client';

import { Product } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { useFormState } from 'react-dom';

import { updateProduct } from '@/app/(root)/products/[productId]/edit/_actions';
import { createProduct } from '@/app/(root)/products/create/_actions';
import SubmitButton from '@/shared/components/submit-button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { formatCurrency } from '@/shared/lib/formatters';

type ProductFormProps = {
  product?: Product | null;
};

const ProductForm = ({ product }: ProductFormProps) => {
  const [error, action] = useFormState(
    product == null ? createProduct : updateProduct.bind(null, product.id),
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents);

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input defaultValue={product?.name || ''} id="name" type="text" name="name" required />
        {error?.name && <p className="text-destructive">{error.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
          id="priceInCents"
          type="number"
          name="priceInCents"
          required
        />
        <div>{formatCurrency((priceInCents || 0) / 100)}</div>
        {error?.priceInCents && <p className="text-destructive">{error.priceInCents}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          defaultValue={product?.description}
          id="description"
          name="description"
          required
        />
        {error?.description && <p className="text-destructive">{error.description}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input id="file" type="file" name="file" required={product == null} />
        {product != null && <div className="text-muted-foreground">{product.filePath}</div>}
        {error?.file && <p className="text-destructive">{error.file}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input id="image" type="file" name="image" required={product == null} />
        {product != null && (
          <Image src={product.imagePath} height={300} width={300} alt={product.name} />
        )}
        {error?.image && <p className="text-destructive">{error.image}</p>}
      </div>

      <SubmitButton text={product == null ? 'Create' : 'Edit'} />
    </form>
  );
};

export default ProductForm;
