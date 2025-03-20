export interface Asset {
  id: number;
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
