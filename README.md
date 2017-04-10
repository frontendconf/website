# Develop

Install dependencies using `yarn` (or `npm i`).

Start application:
```bash
yarn run dev

# Alternative (using the deployed API instead of a local one)
yarn run start
```

# Deploy

```bash
yarn run deploy
```

# Set up alias

```bash
now domains add -e dev-contentful.frontendconf.ch
now alias
```

# Show logs of deployed app

```bash
yarn add -g now-logs
now-logs frontendconf
```

