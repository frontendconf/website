# Develop

Install dependencies using `npm i`

Start application:
```bash
npm start
```

# Deploy

*NOTE*: There is an issue on now.sh where the webpack build throws a SIGSEGV when trying to build the CSS on the server. To temporarily work around this, the deploy steps run a pre-deploy script making sure the CSS is generated locally and uploaded as is.

```bash
# now switch to FEC Team
now switch
```

```bash
# Deploy
npm run deploy
```

# Domain aliasing

NOTE: www.frontendconf.ch is redirected to frontendconf.ch

```bash
# Point dev.frontendconf.ch to latest deployment (use `now ls` to find DEPLOYMENT_ID)
npm run alias frontendconf-contentful-DEPLOYMENT_ID.now.sh dev.frontendconf.ch

# Point frontendconf.ch to latest deployment (use `now ls` to find DEPLOYMENT_ID)
npm run alias frontendconf-contentful-DEPLOYMENT_ID.now.sh frontendconf.ch
```

# Show logs of deployed app

```bash
 # Dev
npm run logs-dev

 # Prod
npm run logs
```
