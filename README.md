# express-sequelize-starter

NodeJS Express App with Sequelize as ORM

Requirements:

1. MySQL 5.7+
2. Node 14+

To setup in a new local environment:

1. Make sure you have the correct Node version

```sh
$ nvm use
```

2. Setup environment variables by adding an `.env` file based on `.env.example`

3. Create the database and run the migration script

```sh
$ npm run db-migrate
```

4. (Optional) Seed the database with data

```sh
$ npm run db-seed
```

5. Install dependencies

```sh
$ npm install
```

6. Run APIdoc

```sh
$ npm run docs
```

7. Start the dev server

```sh
$ npm run dev
```
