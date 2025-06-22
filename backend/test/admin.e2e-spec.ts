import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { createTestApp } from './app.factory';

describe('Admin (e2e)', () => {
  let app: INestApplication;
  let tenantId: number;
  let token: string;
  let userId: number;

  beforeAll(async () => {
    app = await createTestApp();
    const tenant = await request(app.getHttpServer())
      .post('/tenants')
      .send({ name: 'Admin Tenant' })
      .expect(201);
    tenantId = tenant.body.id;

    const user = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ username: 'admin', email: 'admin@example.com', password: '123456', tenantId })
      .expect(201);
    userId = user.body.id;

    await request(app.getHttpServer())
      .post('/admin/roles')
      .set('Authorization', `Bearer invalid`) // expecting unauthorized
      .send({ name: 'Admin' })
      .expect(401);

    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: '123456' })
      .expect(201);
    token = login.body.accessToken;

    await request(app.getHttpServer())
      .post('/admin/roles')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Admin' })
      .expect(201);

    await request(app.getHttpServer())
      .post(`/admin/users/${userId}/roles`)
      .set('Authorization', `Bearer ${token}`)
      .send({ role: 'Admin' })
      .expect(201);

    const relogin = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: '123456' })
      .expect(201);
    token = relogin.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('Config bilgisi alınabiliyor mu?', async () => {
    const res = await request(app.getHttpServer())
      .get(`/admin/config`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body).toHaveProperty('appPort');
  });

  it('Log kaydı listeleme çalışıyor mu?', async () => {
    const res = await request(app.getHttpServer())
      .get(`/admin/logs?tenantId=${tenantId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    console.log('Log count:', res.body.length);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
