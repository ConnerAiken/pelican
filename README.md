# Work log

## Week 1 - 0 Remaining hours
.5h -> Discussions about implementation/your vision 
.5h -> Setting up staging server, code repository and "web server" to handle server request 
.5h -> Setting up SSL certificates on the staging server so the API works correctly (Geolocation has unique requirements for security) and the site is secure. 
.5h -> Configuring the app to work as a PWA (Progressive Web App) and researching best options for libraries/google map's api 
2h -> Creating sample google maps component /w location tracking 

# Week 2 - 0 Remaining hours
1h -> Creating sample google maps component /w destination and directions 
.5h -> Setting up dynamic destination updates 
.5h -> Location lookup translation to address 
3h -> Setting up analytics, css frameworks, React Router and middleware functions 

# Week 3 - 1 hour banked/total of 6 available (8/28~ish)
.25h -> Phone call /w Trulioo 
1.75h (9:00am-10:45am - 8/30/18) -> Setting up ansible deployment scripts  
.5h (10:45am-11:15am - 8/30/18) -> Setup mysql db 
.5h (11:15am-11:45am - 8/30/18) -> Refining ansible deployment scripts to use docker technology pt 1
3h (1:15pm-4:15pm - 8/30/18) -> Refining ansible deploy scripts pt 2, start of JWT authentication and setting up SSL certificates /w express (not automatically renewing at this point) 


# Week 4 - 76 hours banked for 4 weeks - (9/4/2018)
Remaining: 65 hours

1.5h (Mon - 11am-12:30pm) -> Upgrading babel, researching on iOS html/css requirements.
1h (Mon - 1:45pm-2:45pm -> attempting to make scroll viewport work correctly in iphone, build process changes for docker
1.5h (Mon - 2:45pm-4:15pm) -> Starting on registration wireframe, layout done but no validation
1.75h (Mon - 4:15pm-6pm) -> /register server endpoint, creates user account and logs in user account. Front end login request but force success redirect.
2.25h (Saturday - 10:00am-12:15pm) -> Improving landing page css by adding flexbox, adding login validation using regex and hook registration form into server-side endpoint

1.5h (Monday - 10:15am-11:45am) -> Breaking up address into parts: city, zip, line1, line2, state, country, etc. Adding further validation (message on bad login, duplicate user)
.5h (Monday - 5:15pm-5:45pm)

## SSL Certificates

### Usage

Generate SSL certificates by installed `certbot` (google letsencrypt). Next, run `certbot certonly --standalone --email admin@example.com -d example.com` from the server. Once the certificates are generated (usually in `/etc/letsencrypt/live/example.com/`), ensure they are in the same path or symlinked to the path in server/index.js

## Docker

### Monitoring

There are a few docker commands to know. 

1) `docker container ls -a` -> List all running and stopped containers 
2) `docker container start pelican-app` -> Starts a stopped docker container 
3) `docker container logs pelican-app -f` -> Emits log and follows (like the linux command `tail`). 

## Playbooks

### Deploy

The deployment playbook assumes that there is a mysql db already running on the host or on another host and the application environmental variables have been updated to reflect that. This playbook does not set any env variables but can be run against a fresh LAMP stack droplet from DigitalOcean. The playbook does not currently setup SSL certificates so those will need to be manually added as well. See SSL Certificates->Usage above.

## Trulioo API

### Discovery call

1) You guys have a rest api correct? is that the only version offered?
 
2) Do you offer any NodeJS api libraries or only java/c#?

3) What is the difference between a global gateway and napi account?
-> global gateway: all encompassioning
-> napi: 

4) Are we billed by the number of rates or flat fee?
-> Charge per request

5) Are there any limitations to the file format uploaded to the document verification api?  For example, any specific image formats or caveats of image processing?
-> SDK coming soon /w upload ability

6) Can the picture upload be from a camera or must it be a photo.
-> 

Tasks
- [ ] We need to setup a privacy policy
 

## System Specifics

### Authentication - JWT
Overview image: https://appdividend.com/wp-content/uploads/2018/02/Node-js-API-JWT-Authentication-Tutorial.jpg
See: https://appdividend.com/2018/02/07/node-js-jwt-authentication-tutorial-scratch/

### Usage

#### Making Changes

Making changes are simple! Follow these steps..

1) `git clone <this_url> && cd <repo_name>`  
2) `npm install` 
3) `npm run dev` 
4) Access the dev environment via `http://localhost:8080` 
5) Front end changes are shown instantly, server-side changes currently require restart 
6) Commit your changes and push to the remote repo 
7) `npm run deploy` (requires ansible to be installed) 