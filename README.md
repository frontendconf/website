# Develop

Install dependencies using `npm i`

Start application:
```bash
npm start
```

# Deploy

*NOTE*: There is an issue on now.sh where the webpack build throws a SIGSEGV when trying to build the CSS on the server. To temporarily work around this, the deploy steps run a pre-deploy script making sure the CSS is generated locally and uploaded as is.

```bash
# Dev
npm run deploy-dev

# Prod
npm run deploy
```

# Show logs of deployed app

```bash
 # Dev
npm run logs-dev

 # Prod
npm run logs
```

