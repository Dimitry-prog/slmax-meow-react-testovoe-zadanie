import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProducts } from '@/app/(root)/products/_actions/get-products';
import { getProductById } from '@/app/(root)/products/[productId]/_actions';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { formatCurrency } from '@/shared/lib/formatters';

type ProductPageProps = {
  params: {
    productId: string;
  };
};

const ProductPage = async ({ params: { productId } }: ProductPageProps) => {
  const product = await getProductById(productId);

  if (!product) {
    return notFound();
  }

  return (
    <Card className="flex flex-col overflow-hidden border-none shadow-none">
      <div className="relative aspect-video h-auto w-full">
        <Image src={product.imagePath} alt={product.name} fill />
      </div>

      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{formatCurrency(product.priceInCents / 10)}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="line-clamp-4">{product.description}</p>
      </CardContent>

      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={`/products/${product.id}/edit`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductPage;

export const generateMetadata = async ({ params: { productId } }: ProductPageProps) => {
  const product = await getProductById(productId);

  if (!product) {
    return notFound();
  }

  return {
    title: product.name,
    description: product.description,
  };
};

export const generateStaticParams = async () => {
  const products = await getProducts();

  return products.map((product) => ({ productId: product.id }));
};
