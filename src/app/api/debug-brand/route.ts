import { NextRequest, NextResponse } from 'next/server';

import brandsAPI from '@/api/woocommerce/brands';
import { fetchBrandBySlug } from '@/handlers/brands/fetchBrandBySlug';
import { fetchProducts } from '@/handlers/products/fetchProducts';
import { IProductListing } from '@/types/product';

// TYMCZASOWE — diagnostyka pustych listingów marek. Do usunięcia.
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug') || 'beretta';

  const wynik: Record<string, unknown> = {};

  try {
    const res = await brandsAPI.getBrand(slug);
    wynik.getBrand = {
      ile: res.data?.length,
      pierwsza: res.data?.[0],
    };
  } catch (error) {
    wynik.getBrand = { blad: (error as Error).message };
  }

  const brandId = (wynik.getBrand as { pierwsza?: { id?: number } })?.pierwsza
    ?.id;

  try {
    const res = await fetchProducts<IProductListing>({
      params: { brand: brandId },
    });
    wynik.fetchProducts = {
      ile: res.products?.length,
      totalPages: res.totalPages,
      totalProducts: res.totalProducts,
      nazwy: res.products?.slice(0, 3).map((p) => p.name),
    };
  } catch (error) {
    wynik.fetchProducts = { blad: (error as Error).message };
  }

  try {
    const res = await fetchBrandBySlug(slug);
    wynik.fetchBrandBySlug = {
      markaJest: !!res.brand,
      ile: res.products?.length,
      totalProducts: res.totalProducts,
    };
  } catch (error) {
    wynik.fetchBrandBySlug = { blad: (error as Error).message };
  }

  return NextResponse.json(wynik);
}
