import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './app.factory';

describe('Tenant (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Tenant oluşturulabiliyor mu?', async () => {
    const res = await request(app.getHttpServer())
      .post('/tenants')
      .send({ name: 'Test Tenant' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'Test Tenant');
  });
});
