# Develop

```
echo "{
  \"watch\": [\"index.js\"],
  \"env\": {
    \"API\": \"http://localhost:3001\"
  }
}" > nodemon.json
```

```
yarn run dev
```

# Deploy

```
yarn run deploy
```

# Set up alias

```
now domains add -e dev-contentful.frontendconf.ch
now alias
```
