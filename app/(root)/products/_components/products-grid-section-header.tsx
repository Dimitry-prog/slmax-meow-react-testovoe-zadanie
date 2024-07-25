'use client';

import { Product } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/shared/components/ui/button';

type ProductsGridSectionHeaderProps = {
  title: string;
  products: Product[];
};

const ProductsGridSectionHeader = ({ title, products }: ProductsGridSectionHeaderProps) => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between gap-4">
      {products.length > 0 ? (
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold">{title}</h2>

          {pathname !== '/products' && (
            <Button asChild variant="outline">
              <Link href="/products" className="space-x-2">
                <span>View All</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <h2 className="text-3xl font-bold">Dont have any products</h2>
      )}

      <Button asChild>
        <Link href="/products/create">Create Product</Link>
      </Button>
    </div>
  );
};

export default ProductsGridSectionHeader;
