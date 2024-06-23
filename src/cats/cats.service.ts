import { Cat } from './cat.model';

export type CatCreateDTO = {
  name: string;
  age: number;
  breed: string;
};

export interface CatsService {
  create(cat: CatCreateDTO): Promise<Cat>;
  findAll(): Promise<any>;
}
