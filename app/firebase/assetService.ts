import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  DocumentData
} from 'firebase/firestore';
import { db } from './config';
import { Asset } from '../types/asset';

const COLLECTION_NAME = 'assets';
const assetsCollection = collection(db, COLLECTION_NAME);

const convertToAsset = (doc: DocumentData): Asset => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    type: data.type,
    description: data.description,
    creationDate: data.creationDate,
    updatedDate: data.updatedDate,
    hits: data.hits,
    businessQuestions: data.businessQuestions || [],
    amountOfPages: data.amountOfPages,
    hasVisuals: data.hasVisuals
  };
};

export const assetService = {
  // Get all assets
  async getAllAssets(): Promise<Asset[]> {
    const snapshot = await getDocs(assetsCollection);
    return snapshot.docs.map(convertToAsset);
  },

  // Get a single asset by ID
  async getAssetById(id: string): Promise<Asset | null> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return convertToAsset(snapshot);
  },

  // Create a new asset
  async createAsset(asset: Omit<Asset, 'id'>): Promise<Asset> {
    const docRef = await addDoc(assetsCollection, {
      ...asset,
      creationDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
      hits: 0
    });
    return {
      ...asset,
      id: docRef.id,
      hits: 0,
      creationDate: new Date().toISOString(),
      updatedDate: new Date().toISOString()
    };
  },

  // Update an asset
  async updateAsset(id: string, asset: Partial<Asset>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...asset,
      updatedDate: new Date().toISOString()
    });
  },

  // Delete an asset
  async deleteAsset(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  },

  // Search assets by type
  async searchByType(type: string): Promise<Asset[]> {
    const q = query(assetsCollection, where('type', '==', type));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(convertToAsset);
  },

  // Get most viewed assets
  async getMostViewed(limitCount: number = 5): Promise<Asset[]> {
    const q = query(
      assetsCollection,
      orderBy('hits', 'desc'),
      firestoreLimit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(convertToAsset);
  },

  // Increment asset hits
  async incrementHits(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const currentHits = snapshot.data().hits || 0;
      await updateDoc(docRef, {
        hits: currentHits + 1
      });
    }
  }
}; 