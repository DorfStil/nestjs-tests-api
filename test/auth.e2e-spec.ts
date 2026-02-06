import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import type { AuthDto } from '~/auth/dto/auth.dto';

describe('Контроллер review (e2e)', () => {
  let app: INestApplication<App>;
  let loginDto: AuthDto;
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
  });

  it('Создание пользователя (success)' + '\n' + '/auth/register', async () => {
    const response: request.Response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(loginDto)
      .expect(201);

    userId = response.body._id;
    expect(userId).toBeDefined();
  });

  it(
    'Аутентификация пользователя (success)' + '\n' + '/auth/login',
    async () => {
      const user = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(200);

      token = user.body.access_token;
      expect(token).toBeDefined();
    },
  );

  it('Удаление пользователя' + '\n' + '/users/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
    await disconnect();
  });
});
