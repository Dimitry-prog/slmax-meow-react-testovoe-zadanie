import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

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

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden">
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
          <Link href={`/products/${product.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
