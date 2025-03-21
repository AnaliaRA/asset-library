export interface Asset {
  id: string;
  name: string;
  type: string;
  description: string;
  creationDate: string;
  updatedDate: string;
  hits: number;
  businessQuestions?: string[];
  amountOfPages?: number;
  hasVisuals?: boolean;
  needsApproval?: boolean;
} 