import { notFound } from 'next/navigation';

import ProductForm from '@/app/(root)/products/_components/product-form';
import Title from '@/app/(root)/products/_components/title';
import { getProductById } from '@/app/(root)/products/[productId]/_actions';

type EditProductPageProps = {
  params: {
    productId: string;
  };
};

const EditProductPage = async ({ params: { productId } }: EditProductPageProps) => {
  const product = await getProductById(productId);

  return (
    <>
      <Title title="Edit Product" />
      <ProductForm product={product} />
    </>
  );
};

export default EditProductPage;

export const generateMetadata = async ({ params: { productId } }: EditProductPageProps) => {
  const product = await getProductById(productId);

  if (!product) {
    return notFound();
  }

  return {
    title: `Edit ${product.name}`,
    description: product.description,
  };
};
