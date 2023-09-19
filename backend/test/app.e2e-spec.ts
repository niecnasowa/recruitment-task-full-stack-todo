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

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect([
        { id: 1, content: 'content 1', done: false },
        { id: 2, content: 'content 2', done: true },
      ]);
  });

  it('/tasks (POST)', () => {
    const newTask = { content: 'new task' };
    return request(app.getHttpServer())
      .post('/tasks')
      .send(newTask)
      .expect(201)
      .then((response) => {
        expect(response.body.content).toEqual(newTask.content);
        expect(response.body.done).toEqual(false);
        expect(response.body.id).toBeDefined();
      });
  });

  it('/tasks/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/tasks/1')
      .send({ done: true })
      .expect(200)
      .then((response) => {
        expect(response.body.id).toEqual(1);
        expect(response.body.content).toEqual('content 1');
        expect(response.body.done).toEqual(true);
      });
  });

  it('/tasks/:id (DELETE)', () => {
    return request(app.getHttpServer()).delete('/tasks/1').expect(200);
  });
});
