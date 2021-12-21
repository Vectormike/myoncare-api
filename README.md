# myoncare

### Prerequisites

1. `NodeJs`
2. `NPM`
3. `MySQL`
4. `Docker`
5. `Sequelize`

## Project setup

```
$ npm install
```

In your `.env` file, set your environment variables:

```
PORT
DB_HOST
DB_PORT
DB_DATABASE
DB_USERNAME
DB_PASSWORD
DB_DIALECT
DB_PORT_DOCKER_PORT
JWT_SECRET
JWT_ALGO
```

### Database

Run database migration:

```
sequelize db:migrate
```

### Start the server

Run the server:

```
npm start
```

- in development

```
npm run dev
```

### Docker

To run the server:

```
docker-compose up -d
```

The port exposed is `3001`
