# Тестовое задание
Реализовал fullstack проект c функционалом:
- Авторизация;
- Регистрация;
- Список стран с возможностью (добавлять/редактировать/удалять).

ТЗ: https://docs.google.com/document/d/1xP3GnIWLn28CEg7pyJSDKlMKCbf-zD-iF5fhfoPYnnM/edit?usp=sharing

## Локальный запуск проекта
- В корне проекта меняем .env_example на .env
- Собираем и запускаем проект
```bash
docker-compose build && docker-compose up -d
```

## Компоненты приложения
### Frontend
- Feature-Sliced Design (FSD) архитектура
- Next.js 15
- ReactQuery
- MUI

### Backend
- Гексагональная архитектура
- Nest.js
- PostgreSQL
- TypeORM
- Jest
- JWT
