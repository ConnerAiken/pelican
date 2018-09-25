# Pelican Delivers

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


## Integrations

### Google Maps

### Greenbits

Api docs: https://developer.greenbits.com/v1/

Auth token: (Send basic auth /w username/password to https://api.greenbits.com/api/v1/me, use token/company IDs to generate requetss such as https://api.greenbits.com/api/v1/companies/239e77a5-d1c4-4510-962e-2de706d33af0)

Or should we use websockets? https://developer.greenbits.com/v2/#header-events