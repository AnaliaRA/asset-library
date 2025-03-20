import { NextResponse } from 'next/server';
import assets from '@/app/data/assets.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const typeFilter = searchParams.get('type') || 'all';

  if (typeFilter && typeFilter !== 'all') {
    const filteredAssets = assets.filter(
      (asset: { type: string }) =>
        asset.type.toLowerCase() === typeFilter.toLowerCase()
    );
    return NextResponse.json(filteredAssets);
  }

  return NextResponse.json(assets);
}
