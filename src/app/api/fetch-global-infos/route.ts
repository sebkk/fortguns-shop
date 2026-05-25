import { NextRequest, NextResponse } from 'next/server';

import globalInfosApi from '@/api/global_infos';

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Query parameter "id" is required' },
        { status: 400 },
      );
    }

    const data = await globalInfosApi.getGlobalInfosById(id);

    return NextResponse.json(data, {
      status: 200,
      headers: {
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
