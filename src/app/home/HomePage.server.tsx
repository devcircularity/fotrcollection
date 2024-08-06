// src/app/home/page.tsx
import { Metadata } from 'next';
import { BannerService, CategoryService, ProductService } from '@/services';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Home | FOTR Collection',
  description: 'Browse our collection of banners, categories, and products',
};

export default async function HomePage() {
  const PAGE = 1;
  const LIMIT = 12;

  try {
    const banners = await BannerService.getBanners();
    console.log('Fetched banners:', banners); // Log fetched banners

    const categories = await CategoryService.getCategories();
    console.log('Fetched categories:', categories); // Log fetched categories

    const products = await ProductService.getProducts({ page: PAGE, limit: LIMIT });
    console.log('Fetched products:', products); // Log fetched products

    // Ensure products have all necessary fields
    const formattedProducts = products.map(product => ({
      ...product,
      category: product.category || '',
      gender: product.gender || '',
      description: product.description || '',
    }));

    return (
      <HomePageClient banners={banners} categories={categories} initialProducts={formattedProducts} />
    );
  } catch (error) {
    console.error("Error occurred while fetching data for the home page:", error);
    return (
      <div>
        <h1>Error loading data</h1>
        <p>Please try again later.</p>
      </div>
    );
  }
}
