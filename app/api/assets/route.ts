import { NextResponse } from 'next/server';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '@/app/firebase/config';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const typeFilter = searchParams.get('type') || 'all';

    const assetsRef = collection(db, 'assets');
    const q = typeFilter !== 'all' 
      ? query(assetsRef, where('type', '==', typeFilter.toLowerCase()))
      : assetsRef;

    const querySnapshot = await getDocs(q);
    const assets = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(assets);
  } catch (error) {
    console.error('Error fetching assets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch assets' },
      { status: 500 }
    );
  }
}
