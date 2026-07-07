import { NextRequest, NextResponse } from 'next/server';

import globalInfosApi from '@/api/global_infos';
import { PUBLIC_API_CACHE_HEADERS } from '@/constants/cache';
import { cachedGetGlobalInfosById } from '@/handlers/globalInfos/getGlobalInfos';

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    const fresh = request.nextUrl.searchParams.get('fresh') === '1';

    if (!id) {
      return NextResponse.json(
        { error: 'Query parameter "id" is required' },
        { status: 400 },
      );
    }

    const data = fresh
      ? await globalInfosApi.getGlobalInfosById(id)
      : await cachedGetGlobalInfosById(id);

    return NextResponse.json(data, {
      status: 200,
      headers: {
        ...(fresh
          ? {
              'Cache-Control': 'no-store, max-age=0',
            }
          : PUBLIC_API_CACHE_HEADERS),
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching global infos:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch global infos',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
