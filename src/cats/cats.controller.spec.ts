import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let controller: CatsController;

  const catsService = {
    create: jest
      .fn()
      .mockResolvedValue({ id: 1, name: 'Test', age: 1, breed: 'Test' }),
    findAll: jest.fn().mockResolvedValue([
      { id: 1, name: 'Test', age: 1, breed: 'Test' },
      { id: 2, name: 'Test 2', age: 2, breed: 'Test 2' },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: catsService,
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should find all cats', async () => {
    const cats = await controller.findAll();
    expect(cats).toEqual([
      { id: 1, name: 'Test', age: 1, breed: 'Test' },
      { id: 2, name: 'Test 2', age: 2, breed: 'Test 2' },
    ]);
  });

});
