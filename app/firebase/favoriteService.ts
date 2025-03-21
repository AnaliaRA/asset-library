import { db } from './config';
import { 
  doc, 
  setDoc, 
  deleteDoc, 
  getDoc, 
  collection, 
  getDocs,
  DocumentData 
} from 'firebase/firestore';
import { Asset } from '../types/asset';

const FAVORITES_COLLECTION = 'favorites';

export const favoriteService = {
  async addToFavorites(asset: Asset): Promise<void> {
    const favoriteRef = doc(db, FAVORITES_COLLECTION, asset.id);
    await setDoc(favoriteRef, {
      assetId: asset.id,
      asset,
      createdAt: new Date().toISOString(),
    });
  },

  async removeFromFavorites(assetId: string): Promise<void> {
    const favoriteRef = doc(db, FAVORITES_COLLECTION, assetId);
    await deleteDoc(favoriteRef);
  },

  async isFavorite(assetId: string): Promise<boolean> {
    const favoriteRef = doc(db, FAVORITES_COLLECTION, assetId);
    const favoriteDoc = await getDoc(favoriteRef);
    return favoriteDoc.exists();
  },

  async getFavorites(): Promise<Asset[]> {
    const favoritesRef = collection(db, FAVORITES_COLLECTION);
    const querySnapshot = await getDocs(favoritesRef);
    return querySnapshot.docs.map((doc) => (doc.data() as DocumentData).asset as Asset);
  }
}; 