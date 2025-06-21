-- Sample database schema for gokhan project

CREATE TABLE tenant (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  tenant_id INTEGER REFERENCES tenant(id)
);

CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  tenant_id INTEGER REFERENCES tenant(id)
);
