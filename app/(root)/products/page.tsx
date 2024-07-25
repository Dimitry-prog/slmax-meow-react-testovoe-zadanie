import type { Metadata } from 'next';
import { Suspense } from 'react';

import { getProducts } from '@/app/(root)/products/_actions/get-products';
import ProductCardSkeleton from '@/app/(root)/products/_components/product-card-skeleton';
import ProductsGridSection from '@/app/(root)/products/_components/products-grid-section';

const ProductsPage = () => {
  return (
    <Suspense fallback={<ProductCardSkeleton />}>
      <ProductsGridSection title="All Products" fetcherProducts={getProducts} />
    </Suspense>
  );
};

export default ProductsPage;

export const metadata: Metadata = {
  title: 'Products',
  description: 'Products page',
};
