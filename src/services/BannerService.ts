import { Banner } from '@/types';
import apiClient from '@/utils/apiClient';
import { catchError } from '@/utils/catchError';

const getBanners = async (): Promise<Banner[]> => {
  try {
    const { data } = await apiClient.get(`/banners`);
    return data.data;
  } catch (error: unknown) {
    console.error("Error fetching banners:", error); // Log the error
    throw new Error(catchError(error as Error));
  }
};

export const BannerService = {
  getBanners,
};
