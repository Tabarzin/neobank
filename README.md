# Neobank

## Как развернуть проект локально:

```bash

- git clone git@github.com:Tabarzin/neobank.git
- cd neobank
- yarn install
- yarn dev

```

## Module 1

### Структура проекта

- pages - директория для страниц приложения
- внутри каждой страницы свои компоненты, которые используются только на этой странице
- src/components - директория для компонентов, которые используются по всему проекту

## Module 2

#### Подключил сервис показа курса валют:

- API Currency Exchange - https://rapidapi.com/fyhao/api/currency-exchange/.
- Обновление курса каждые 15 минут.

#### Подключиk сервис показа текущих новостей:

- API https://newsapi.org/
- фильтрация битых ссылок и некорректной информации

#### Реализовал слайдер для пролистывания новостей:

- сделал блокировку кнопок на первой и последнем элементе.
