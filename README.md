# Events Portal - iGenOttawa
This repo will hold the iGenEventsPortal &trade; that will be used for [iGenOttawa](https://igenottawaca.previews.rebel.com/)

## Infrastructure
mLab for Mongo
Cloudinary for image hosting + optimization
Netlify for functions and static content

## A note on builds
Local development uses `npm run dev`. Netlify uses `npm run build`.

## Running locally
Setup a `.env` file with the following environment variables (get info from a developer):
```
#TODO
MONGO_CONNECTION_STRING=
```

```
npm install
npm install -g netlify-cli
npm run dev
```

Access the function at http://localhost:8888/.netlify/functions/app.

## Deploying
Just `git push`. Netlify runs the `build` script defined in `package.json.`