import { Product } from '@prisma/client';

import ProductCard from '@/app/(root)/products/_components/product-card';
import ProductsGridSectionHeader from '@/app/(root)/products/_components/products-grid-section-header';

type ProductsGridSectionProps = {
  title: string;
  fetcherProducts: () => Promise<Product[]>;
};

const ProductsGridSection = async ({ title, fetcherProducts }: ProductsGridSectionProps) => {
  const products = await fetcherProducts();

  return (
    <section className="space-y-4">
      <ProductsGridSectionHeader title={title} products={products} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsGridSection;
