import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /cats', async () => {
    const response = await request(app.getHttpServer())
      .post('/cats')
      .send({ name: 'test', age: 5, breed: 'test' });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('test');
    expect(response.body.age).toBe(5);
    expect(response.body.breed).toBe('test');
  });

  it('GET /cats', async () => {
    await request(app.getHttpServer())
      .post('/cats')
      .send({ name: 'test', age: 5, breed: 'test' });
    const response = await request(app.getHttpServer()).get('/cats');
    expect(response.status).toBe(200);
    expect(response.body[0].name).toBe('test');
    expect(response.body[0].age).toBe(5);
    expect(response.body[0].breed).toBe('test');
  });
});
