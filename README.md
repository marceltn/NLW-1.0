# NLW-1.0
Ecoleta - a marketplace to collect waste - Next Level Week from Rocketset

## Server project
### Set up
```bash
cd server
yarn install

yarn run db:migrate
yarn run db:seed # to run knex seed:run
```

### Run application
```bash
cd server && yarn dev
cd web && yarn start
cd mobile && yarn start
```

### Database commands
```bash
yarn run db # to run knex commands
yarn run db:up # to run knex migrate:up
yarn run db:down # to run knex migrate:down
```

## About the Stack
In this project, I use the React JS on web project, React Native in mobile project and Node with express in server project

## Future improvements
- [] Include test
- [] Dockernizer
- [] Use environment variables for server uri and other configurations
- [] Add production configurations
