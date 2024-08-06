// src/app/home/HomePageClient.tsx
'use client';

import React from 'react';
import { Meta, MobileBottomMenu } from '@/components/core';
import ProductOverviewSection from '@/components/home/ProductOverviewSection';
import { Banners, Container, Heading } from '@/components/ui';
import { Category, Product } from '@/types';
import Categories from '@/components/category/Categories';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface HomePageClientProps {
  banners: Array<{ _id: string; name: string; imageURL: string }>;
  categories: Category[];
  initialProducts: Product[];
}

const HomePageClient: React.FC<HomePageClientProps> = ({ banners, categories, initialProducts }) => {
  return (
    <div>
      <Meta />
      <Banners banners={banners} />
      <Container>
        <Heading>Categories</Heading>
        <Categories categories={categories} />
        <ProductOverviewSection initialProducts={initialProducts} />
      </Container>
      <MobileBottomMenu />
    </div>
  );
};

export default HomePageClient;
