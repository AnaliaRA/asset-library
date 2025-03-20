import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Asset } from '@/types/asset';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'assets.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const assets: Asset[] = JSON.parse(fileContents);

    const assetId = parseInt(params.id);
    if (isNaN(assetId)) {
      return NextResponse.json({ error: 'Invalid asset ID' }, { status: 400 });
    }

    const asset = assets.find(a => a.id === assetId);

    if (!asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }

    return NextResponse.json(asset);
  } catch (error) {
    console.error('Error reading asset:', error);
    return NextResponse.json(
      { error: 'Failed to fetch asset' },
      { status: 500 }
    );
  }
}
