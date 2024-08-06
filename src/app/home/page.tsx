// src/app/home/page.tsx
import { Metadata } from 'next';
import { BannerService, CategoryService, ProductService } from '@/services';
import HomePageClient from './HomePageClient';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Home | FOTR Collection',
  description: 'Browse our collection of banners, categories, and products',
};

export default async function HomePage() {
  const PAGE = 1;
  const LIMIT = 12;

  const banners = await BannerService.getBanners();
  const categories = await CategoryService.getCategories();
  const products = await ProductService.getProducts({ page: PAGE, limit: LIMIT });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageClient banners={banners} categories={categories} initialProducts={products} />
    </Suspense>
  );
}
