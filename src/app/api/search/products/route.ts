import { NextRequest, NextResponse } from 'next/server';

import productsApi from '@/api/woocommerce/products';
import { PER_PAGE_DEFAULT } from '@/constants/products';
import {
  IGetProductsParams,
  PRODUCTS_ORDER,
  PRODUCTS_ORDER_BY,
  STOCK_STATUS,
} from '@/types/product';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Extract query parameters
    const params: IGetProductsParams = {};

    if (searchParams.has('search')) {
      params.search = searchParams.get('search') || undefined;
    }

    if (searchParams.has('_fields')) {
      params._fields = searchParams.get('_fields') || undefined;
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

    if (searchParams.has('category')) {
      params.category = searchParams.get('category') || undefined;
    }

    if (searchParams.has('brand')) {
      params.brand =
        parseInt(searchParams.get('brand') || '0', 10) || undefined;
    }

    if (searchParams.has('orderby')) {
      params.orderby =
        (searchParams.get('orderby') as PRODUCTS_ORDER_BY) || undefined;
    }

    if (searchParams.has('order')) {
      params.order = (searchParams.get('order') as PRODUCTS_ORDER) || undefined;
    }

    if (searchParams.has('stock_status')) {
      params.stock_status = searchParams.get('stock_status') as STOCK_STATUS;
    }

    // Call the WordPress API through productsApi
    const response = await productsApi.getProducts({
      per_page: PER_PAGE_DEFAULT,
      orderby: PRODUCTS_ORDER_BY.DATE,
      order: PRODUCTS_ORDER.ASC,
      ...params,
      page: params.page ? +params.page : 1,
    });

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
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
