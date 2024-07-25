import ProductForm from '@/app/(root)/products/_components/product-form';
import Title from '@/app/(root)/products/_components/title';

const CreateProductPage = () => {
  return (
    <>
      <Title title="Create Product" />
      <ProductForm />
    </>
  );
};

export default CreateProductPage;
