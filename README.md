# Develop

Install dependencies using `npm i`

Start application:
```bash
npm start
```

# Deploy

*NOTE*: There is an issue on now.sh where the webpack build throws a SIGSEGV when trying to build the CSS on the server. To temporarily work around this, the deploy steps run a pre-deploy script making sure the CSS is generated locally and uploaded as is.

```bash
# Deploy
npm run deploy
```

# Domain aliasing

*NOTE*: We probably have to create a team on zeit.co first to be able to set domain aliases. For now, this is most probably tied to Thomas' account.

```bash
# Point dev.frontendconf.ch to latest deployment
npm run alias-dev

# Point www.frontendconf.ch to latest deployment
npm run alias

# Point any of the above subdomains to any deployment (assumes `now` is installed globally, use `now ls` to find DEPLOYMENT_ID)
now alias frontendconf-contentful-DEPLOYMENT_ID.now.sh SUBDOMAIN.frontendconf.ch
```

# Show logs of deployed app

```bash
 # Dev
npm run logs-dev

 # Prod
npm run logs
```

