# Basic template API

Service for new adding users and handling data

### Requirements ✔️

- NodeJS 16
- docker-compose >= 1.29.x

### Recommended VSCode Plugins 🧩

- Mocha
- Mocha Test Explorer
- Test Explorer UI
- Prettier - Code formatter
- ESLint
- GitLens - Git supercharged
- Docker

### Getting Started 🚀

Install dependecies

```bash
$  npm i
```

Running on docker container

```bash
$  docker-compose up
```

## Test + development tips ☕
### Use Mocha explorer extension on vscode to see and play with local tests.
[Link to download extension](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter)

Also, you will need this in your `settings.json` vscode file: 
```json
"mochaExplorer.envPath": ".env.local",
  "mochaExplorer.require": [
    "ts-node/register",
    "tsconfig-paths/register"
  ],
  "mochaExplorer.files": "test/**/*.ts",
```

### Clear database and run migrations again:

```bash
$  npm db:clear
```

### Watch and manipulate databases:
#### (Starts up with docker-compose up)
[Local link to PHP My Admin](http://0.0.0.0:8084) 

[Local link to Mongo Express](http://0.0.0.0:8081)

### API URL 🌐

- Local: [http://localhost:3005](http://localhost:3005)
- Production: [https://boil-api.herokuapp.com/](https://boil-api.herokuapp.com/)

### Docs 📝

All docs in `/docs` folder
