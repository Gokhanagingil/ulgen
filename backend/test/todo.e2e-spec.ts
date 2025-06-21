import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './app.factory';

describe('Todo (e2e)', () => {
  let app: INestApplication;
  let tenantId: number;
  let token: string;

  beforeAll(async () => {
    app = await createTestApp();
    const tenant = await request(app.getHttpServer())
      .post('/tenants')
      .send({ name: 'Test Tenant' })
      .expect(201);
    tenantId = tenant.body.id;

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        username: 'gokhan',
        email: 'gokhan@example.com',
        password: '123456',
        tenantId,
      })
      .expect(201);

    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'gokhan@example.com', password: '123456' })
      .expect(201);
    token = login.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('JWT ile todo kaydı yapılabiliyor mu?', async () => {
    const res = await request(app.getHttpServer())
      .post(`/todos?tenantId=${tenantId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Buy milk', completed: false })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toMatchObject({ title: 'Buy milk', completed: false, tenantId });
  });

  it('JWT ile todo listesi çekilebiliyor mu?', async () => {
    const res = await request(app.getHttpServer())
      .get(`/todos?tenantId=${tenantId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
