import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './app.factory';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let tenantId: number;

  beforeAll(async () => {
    app = await createTestApp();
    const res = await request(app.getHttpServer())
      .post('/tenants')
      .send({ name: 'Test Tenant' })
      .expect(201);
    tenantId = res.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Yeni kullanıcı kayıt olabiliyor mu?', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        username: 'gokhan',
        email: 'gokhan@example.com',
        password: '123456',
        tenantId,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.password).not.toBe('123456');
  });

  it('Kullanıcı login olup JWT token alabiliyor mu?', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'gokhan@example.com', password: '123456' })
      .expect(201);

    expect(res.body).toHaveProperty('accessToken');
  });
});
