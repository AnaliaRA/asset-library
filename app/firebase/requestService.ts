import { db } from './config';
import { 
  collection, 
  addDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { Asset } from '../types/asset';

const REQUESTS_COLLECTION = 'requests';
const requestsCollection = collection(db, REQUESTS_COLLECTION);

interface AssetRequest {
  assetId: string;
  asset: Asset;
  justification: string;
  needsApproval: boolean;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const requestService = {
  async createRequest(asset: Asset, justification: string): Promise<void> {
    await addDoc(requestsCollection, {
      assetId: asset.id,
      asset,
      justification,
      needsApproval: true,
      createdAt: new Date().toISOString(),
      status: 'pending'
    });
  },

  async getRequestsByAsset(assetId: string): Promise<AssetRequest[]> {
    const q = query(requestsCollection, where('assetId', '==', assetId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<AssetRequest, 'id'>)
    }));
  },

  async getAllRequests(): Promise<AssetRequest[]> {
    const querySnapshot = await getDocs(requestsCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<AssetRequest, 'id'>)
    }));
  }
}; 