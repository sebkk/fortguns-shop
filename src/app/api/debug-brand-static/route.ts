import { NextResponse } from 'next/server';

import { cachedFetchBrandBySlug } from '@/handlers/brands/fetchBrandBySlug';

// TYMCZASOWE — ten sam tryb renderowania co strona marki. Do usunięcia.
export const dynamic = 'force-static';
export const revalidate = 7200;

export async function GET() {
  const res = await cachedFetchBrandBySlug('beretta');

  return NextResponse.json({
    markaJest: !!res.brand,
    ile: res.products?.length,
    totalPages: res.totalPages,
    totalProducts: res.totalProducts,
  });
}
