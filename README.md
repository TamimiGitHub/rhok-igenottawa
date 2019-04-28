# Events Portal - iGenOttawa
This repo will hold the iGenEventsPortal &trade; that will be used for [iGenOttawa](https://igenottawaca.previews.rebel.com/)

## Infrastructure
mLab for Mongo
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
### Entry point
http://localhost:8888/create.html

Access the functions at http://localhost:8888/.netlify/functions/<function>.
Access HTML in `public` at http://localhost:8888

## Deploying
Just `git push`. Netlify runs the `build` script defined in `package.json.`

## Production URL
https://igenottawa.netlify.com/create.html

## Todo
- Update schema with correct data model types
- Add real user validation upon form submission (e.g. Captcha)
- Search feature on the lists page
- Image upload functionality from the form
- Cloudinary setup for image hosting + optimization
- Tag metadata per event
- Admin portal for removing, updating and revising content
- Notification integration upon form submission
- Google maps integration


### Nice to have
- Social Meida integration for sharing
- Date range filter
- Tag filter
- Modal view for more detials per event 
- Personal Calendar
- Events archive