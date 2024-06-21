import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cat } from './cat.model';

export type CatCreateDTO = {
  name: string;
  age: number;
  breed: string;
};

@Injectable()
export class CatsService {
  private readonly cats: string[] = [];

  private readonly catModel: typeof Cat;

  constructor(@InjectModel(Cat) catModel: typeof Cat) {
    this.catModel = catModel;
  }

  async create(cat: CatCreateDTO): Promise<Cat> {
    const catCreated = await this.catModel.create(cat);
    return catCreated;
  }

  async findAll(): Promise<any> {
    return await this.catModel.findAll();
  }
}
