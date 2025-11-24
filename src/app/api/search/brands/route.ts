import { NextRequest, NextResponse } from 'next/server';

import brandsAPI from '@/api/woocommerce/brands';
import { IGetBrandsParams } from '@/types/brands';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Extract query parameters
    const params: IGetBrandsParams = {};

    if (searchParams.has('search')) {
      params.search = searchParams.get('search') || undefined;
    }

    if (searchParams.has('fields')) {
      params.fields = searchParams.get('fields') || undefined;
    }

    if (searchParams.has('per_page')) {
      const perPage = parseInt(searchParams.get('per_page') || '0', 10);
      if (perPage > 0) {
        params.per_page = perPage;
      }
    }

    if (searchParams.has('page')) {
      const page = parseInt(searchParams.get('page') || '0', 10);
      if (page > 0) {
        params.page = page;
      }
    }

    // Call the WordPress API through brandsAPI
    const response = await brandsAPI.getBrands(params);

    // Return the data with proper headers
    return NextResponse.json(response.data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Forward WordPress API headers
        'X-WP-Total': response.headers['x-wp-total'] || '0',
        'X-WP-TotalPages': response.headers['x-wp-totalpages'] || '0',
      },
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch brands',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
