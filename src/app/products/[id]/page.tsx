import { GetStaticPropsContext } from 'next';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { ProductService } from '@/services/ProductService';
import ProductClient from './ProductClient';
import { Product as ProductTypes } from '@/types';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  try {
    const { product } = await ProductService.getProduct(id);
    return {
      title: product?.name || 'Product',
      description: product?.description || 'Product description',
      openGraph: {
        images: product?.imageURL ? [{ url: product.imageURL }] : [],
      },
    };
  } catch {
    return {
      title: 'Product not found',
      description: 'Product description',
    };
  }
}

export async function generateStaticParams() {
  try {
    const products = await ProductService.getProducts({ page: 1, limit: 100 });

    return products.map((product) => ({
      params: { id: product._id },
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Page({ params }: Props) {
  const id = params.id;

  try {
    const { product, relatedProducts } = await ProductService.getProduct(id);
    return <ProductClient product={product} relatedProducts={relatedProducts} />;
  } catch {
    notFound();
  }
}
