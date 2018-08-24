# frontendconf.ch

Welcome to the code base for frontendconf.ch. You are very welcome to contribute!

Some notes:
- It is based on [`Next.js`](https://github.com/zeit/next.js/) and hosted on [`Now`](http://now.sh/)
- The content is hosted on [`Contentful`](https://www.contentful.com/)
- Since this started as a proof-of-concept, the data handling is rather crude: We are grabbing everything there is from Contentful and transform it to what we want to display on the current page. This will not scale very well, so the next step is to add a reasonable data store and fetching mechanism.
- The styles started within a separate prototype and were merged here as good as possible. However, most of the intentions of the initial CSS structure were probably lost along the way. This will be taken care of as part of the next version.

## Develop

1. Use Node version specified in `.nvmrc` (ideally using [nvm](https://github.com/creationix/nvm)).
2. Install dependencies: `npm install`
3. Start application: `npm start`

## Deploy

*NOTE*: There is an issue on now.sh where the webpack build throws a SIGSEGV when trying to build the CSS on the server. To temporarily work around this, the deploy steps run a pre-deploy script making sure the CSS is generated locally and uploaded as is.

```bash
# now switch to FEC Team
now switch
```

```bash
# Deploy
npm run deploy
```

## Domain aliasing

NOTE: www.frontendconf.ch is redirected to frontendconf.ch

```bash
# Point dev.frontendconf.ch to latest deployment (use `now ls` to find DEPLOYMENT_ID)
npm run alias frontendconf-contentful-DEPLOYMENT_ID.now.sh dev.frontendconf.ch

# Point frontendconf.ch to latest deployment (use `now ls` to find DEPLOYMENT_ID)
npm run alias frontendconf-contentful-DEPLOYMENT_ID.now.sh frontendconf.ch
```

## Show logs of deployed app

```bash
 # Dev
npm run logs-dev

 # Prod
npm run logs
```
