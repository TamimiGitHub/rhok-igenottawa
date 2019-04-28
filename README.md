# Events Portal - iGenOttawa
This repo will hold the iGenEventsPortal &trade; that will be used for [iGenOttawa](https://igenottawaca.previews.rebel.com/)

## Infrastructure
mLab for Mongo
Cloudinary for image hosting + optimization
Netlify for functions and static content

## A note on builds
Local development uses `npm run dev`. Netlify uses `npm run build`.

# Platform
Netlify uses NodeJS 8.x, so using that locally with `nvm` is recommended.

## Running locally
Setup a `.env` file with the following environment variables (get info from a developer):
```
CONNECTION_STRING=
```

```
npm install
npm install -g netlify-cli
npm run dev
```

Access the functions at http://localhost:8888/.netlify/functions/<function>.
Access HTML in `public` at http://localhost:8888

## Deploying
Just `git push`. Netlify runs the `build` script defined in `package.json.`

## Production URL
https://igenottawa.netlify.com

## TODO

### General
* Link back to homepage
* Links between create and listing page
* Rewrite rule for list function? (So that URL doesn't include .netlify/functions)
* Backend validation - required fields
* Image uploads
* Make date/time inputs look nice in Firefox
* French content edits/correctness
* Make schema store real dates, etc.
* Render all submitted fields on cards

### Admin functions
* Delete listing
* Email on new event creation

### Securiy
* Captcha
* Escape user input for XSS, etc.
* Auth for admin functions