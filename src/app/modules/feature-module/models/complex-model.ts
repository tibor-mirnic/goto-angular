import { ComplexModelStatus } from './enums/complex-model-status';

interface IComplexModelItem {
  id: number;
  name: string;
  description: string;
}

export interface IComplexModel {
  name: string;
  description: string;
  status: ComplexModelStatus;
  items: IComplexModelItem[];
}
