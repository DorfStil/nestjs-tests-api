# nestjs-top-api

Backend на NestJS + MongoDB.

## Требования

- Node.js 20+
- npm
- Docker (для локальной MongoDB)

## Быстрый старт

1. Установить зависимости:

```bash
npm ci
```

2. Создать `.env` из примера:

```bash
cp .env.example .env
```

3. Поднять MongoDB:

```bash
docker compose up -d
```

4. Запустить backend в режиме разработки:

```bash
npm run start:dev
```

API будет доступен по адресу: `http://localhost:3000/api`

## Переменные окружения

Используются значения из `.env`:

- `MONGO_LOGIN`
- `MONGO_PASSWORD`
- `MONGO_HOST`
- `MONGO_PORT`
- `MONGO_AUTH_DATABASE`
- `JWT_SECRET`

## Основные команды

- `npm run start:dev` — запуск в watch-режиме
- `npm run build` — сборка
- `npm run start:prod` — запуск собранного приложения
- `npm run test` — unit-тесты
- `npm run test:e2e` — e2e-тесты

## Аутентификация

### Регистрация

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"login":"user@example.com","password":"qwerty"}'
```

### Логин

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login":"user@example.com","password":"qwerty"}'
```

Ответ содержит `access_token`. Для защищённых роутов передавайте заголовок:

```bash
-H "Authorization: Bearer <access_token>"
```

## Эндпоинты

Префикс у всех роутов: `/api`.

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Users (JWT)

- `GET /users`
- `GET /users/me`
- `DELETE /users/:id`

### Reviews

- `GET /reviews` — публичный
- `POST /reviews/create` — JWT
- `GET /reviews/byProduct/:productId` — JWT
- `DELETE /reviews/:id` — JWT

Пример создания отзыва:

```bash
curl -X POST http://localhost:3000/api/reviews/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "name":"Alex",
    "title":"Отличный курс",
    "description":"Много практики",
    "rating":5,
    "productId":"65f9b10f7f7f7f7f7f7f7f7f"
  }'
```

### Product

Сейчас методы-заглушки (возвращают входные данные):

- `POST /product/create`
- `GET /product/:id`
- `DELETE /product/:id`
- `PATCH /product/:id`
- `POST /product`

### Top-page

Сейчас методы-заглушки (возвращают входные данные):

- `POST /top-page/create`
- `GET /top-page/:id`
- `DELETE /top-page/:id`
- `PATCH /top-page/:id`
- `POST /top-page`
