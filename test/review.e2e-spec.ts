import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import type { CreateReviewDto } from '~/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import type { AuthDto } from '~/auth/dto/auth.dto';

const productId: string = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
  name: 'Тест',
  title: 'Заголовок',
  description: 'Текстовое описание',
  rating: 5,
  productId,
};

describe('Контроллер review (e2e)', () => {
  let app: INestApplication<App>;
  let loginDto: AuthDto;
  let createdId: string;
  let userId: string;
  let token: string;

  beforeAll(async () => {
    loginDto = {
      login: `test+${Date.now()}-${Math.round(Math.random() * 1e6)}@test.ru`,
      password: '12345678',
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const registerResponse: request.Response = await request(
      app.getHttpServer(),
    )
      .post('/auth/register')
      .send(loginDto)
      .expect(201);

    userId = registerResponse.body._id;

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200);

    token = loginResponse.body.access_token;
  });

  it(
    'Создания отзыва (success)' + '\n' + '/reviews/create (POST)',
    async () => {
      const response: request.Response = await request(app.getHttpServer())
        .post('/reviews/create')
        .set('Authorization', `Bearer ${token}`)
        .send(testDto)
        .expect(201);

      createdId = response.body._id;
      expect(createdId).toBeDefined();
    },
  );

  it('Создания отзыва (fail)' + '\n' + '/reviews/create (POST)', () => {
    return request(app.getHttpServer())
      .post('/reviews/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...testDto, rating: 0 })
      .expect(400);
  });

  it(
    'Поиск отзыва (success)' + '\n' + '/reviews/byProduct/:productId (GET)',
    async () => {
      return request(app.getHttpServer())
        .get(`/reviews/byProduct/${productId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(({ body }: request.Response) => {
          expect(body.length).toBe(1);
        });
    },
  );

  it(
    'Поиск отзыва (fail)' + '\n' + '/reviews/byProduct/:productId (GET)',
    async () => {
      return request(app.getHttpServer())
        .get(`/reviews/byProduct/${new Types.ObjectId().toHexString()}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(({ body }: request.Response) => {
          expect(body.length).toBe(0);
        });
    },
  );

  it('Удаления отзыва' + '\n' + '/reviews/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/reviews/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterAll(async () => {
    await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await app.close();
    await disconnect();
  });
});
