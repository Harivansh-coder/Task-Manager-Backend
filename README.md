# Task Manager Backend

## Description

This is a simple task manager backend that allows you to create, read, update and delete tasks. It is built using Node.js, Express.js, Prisma and SQLite.

## Installation

1. Clone the repository
2. Run `yarn .` to install the dependencies
3. Run `yarn dev` to start the server

## Endpoints

### Auth

- POST /auth/login

```json
{
  "email": "admin@gmail.com",
  "password": "admin"
}
```

- GET /auth/logout

### Users

- POST /users/register

```json
{
  "name": "Admin",
  "email": "admin@gmail.com",
  "password": "admin"
}
```

- GET /users
- GET /users/:id
- PUT /users/:id
- DELETE /users/:id

title String
description String?
startTime DateTime
dueTime DateTime
endTime DateTime?
userId Int
status String @default("pending")
priority Int

### Tasks

- GET /tasks
- GET /tasks/:id
- POST /tasks

```json
{
  "title": "Task 1",
  "description": "Description 1",
  "dueTime": "2021-09-01T00:00:00.000Z",
  "userId": 1,
  "priority": 1
}
```

- PUT /tasks/:id
- DELETE /tasks/:id
