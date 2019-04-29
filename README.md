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
List of deploys/status: https://app.netlify.com/sites/igenottawa/deploys

## Production URL
https://igenottawa.netlify.com/create.html

## Todo

### High Prio to do
* Links between things
    * Link back to homepage
    * Links between create and listing page
* Every field on the form is to be shown on the card
* French content edits/correctness
* Weebly integration

### General
* Rewrite rule for list function? (So that URL doesn't include .netlify/functions)
* Backend validation - required fields
* Make date/time inputs look nice in Firefox
* Reflect db schema with right number format
* Render all submitted fields on cards

### Nice to have
- Backend validation - required fields
- Notification integration upon form submission
- Image upload functionality from the form
    Cloudinary setup for image hosting + optimization
- Date range filter
- Tag filter
- Events archive
- Ability to preview before posting
- Tag metadata per event
- Admin portal for removing, updating and revising content
- Add real user validation upon form submission (e.g. Captcha)
- Google maps integration
- Social Media integration for sharing
- Modal/other view for more details per event 
- Personal Calendar

### Securiy
* Captcha
* Escape user input for XSS, etc.
* Auth for admin functions
