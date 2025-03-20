import { setDoc, doc } from "firebase/firestore";
import { db } from './config';
import sampleData from '../../sample-assets.json';
import storyboardData from '../../storyboard-assets.json';

export type ImportType = 'sample' | 'storyboard' | 'all';

interface AssetData {
  name: string;
  type: string;
  description: string;
  creationDate: string;
  updatedDate: string;
  businessQuestions: string[];
  amountOfPages: number;
  hasVisuals: boolean;
  hits: number;
}

interface AssetsCollection {
  [key: string]: AssetData;
}

interface ImportData {
  __collections__: {
    assets: AssetsCollection;
  };
}

export async function importSampleData(type: ImportType = 'all') {
  try {
    let assetsToImport: AssetsCollection = {};

    if (type === 'sample' || type === 'all') {
      assetsToImport = { ...assetsToImport, ...(sampleData as ImportData).__collections__.assets };
    }

    if (type === 'storyboard' || type === 'all') {
      assetsToImport = { ...assetsToImport, ...(storyboardData as ImportData).__collections__.assets };
    }

    for (const [id, asset] of Object.entries(assetsToImport)) {
      const assetRef = doc(db, 'assets', id);
      await setDoc(assetRef, {
        ...asset,
        creationDate: new Date(asset.creationDate),
        updatedDate: new Date(asset.updatedDate)
      });
    }
    
    return { success: true, message: `Successfully imported ${type} data` };
  } catch {
    console.error(`Error importing ${type} data`);
    return { success: false, message: `Failed to import ${type} data` };
  }
} 