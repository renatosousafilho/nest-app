import { CatsService } from './cats.service';
import { Cat } from './cat.model';
import { databaseConfig } from '../database/sequelize.config';
import { Sequelize } from 'sequelize-typescript';
import { CatsServiceImpl } from './cats.service.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';

describe('CatsService', () => {
  let service: CatsService;
  // let sequelize: Sequelize;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot(databaseConfig),
        SequelizeModule.forFeature([Cat]),
      ],
      providers: [
        {
          provide: 'CatsService',
          useClass: CatsServiceImpl,
        },
      ],
    }).compile();

    service = module.get<CatsService>('CatsService');
    // sequelize = new Sequelize(databaseConfig);
    // sequelize.addModels([Cat]);
    // await sequelize.sync({ force: true });
    // service = new CatsServiceImpl(Cat);
  });

  // afterEach(async () => {
  //   sequelize.close();
  // });

  it('should create a cat', async () => {
    const cat = { name: 'Test', age: 1, breed: 'Test' };
    const catCreated = await service.create(cat);
    expect(catCreated.id).toBeDefined();
    expect(catCreated.name).toBe('Test');
    expect(catCreated.age).toBe(1);
    expect(catCreated.breed).toBe('Test');
  });

  it('should find all cats', async () => {
    // Arrange
    await Cat.create({ name: 'Test', age: 1, breed: 'Test' });
    await Cat.create({ name: 'Test 2', age: 2, breed: 'Test 2' });

    const cats = await service.findAll();
    expect(cats[0].name).toBe('Test');
    expect(cats[0].age).toBe(1);
    expect(cats[0].breed).toBe('Test');
    expect(cats[1].name).toBe('Test 2');
    expect(cats[1].age).toBe(2);
    expect(cats[1].breed).toBe('Test 2');
  });
});
