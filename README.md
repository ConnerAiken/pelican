# Pelican Delivers

[![Build Status](https://travis-ci.com/ConnerAiken/pelican.svg?token=pBXBM77UiMSriwAnV8zB&branch=master)](https://travis-ci.com/ConnerAiken/pelican)

Pelican Delivers is a marijuana delivery application for legal state-licensed products. It is a nodejs express web server mixed with a react front-end. The express
serves content from Pelican Deliver's own database and wrapper endpoints that communicate with APIs such as Trulioo, Greenbits and more. This application is dockerized
and can be deployed to any machine that hosts docker. It also uses ansible to automate deployments. See the ansible playbooks for more details/configuration.

If my time has passed and you are maintaining/developing this application, I would advise you to use a blank ubuntu VM with digital ocean and run the
playbook against it. It should install all pre-requesites and launch the application. The playbooks do not setup any form of DNS to the machine however. You will need to google domain setup and point the nameservers to your hosting provider.

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
 
## System Specifics

### Authentication - JWT
Overview image: https://appdividend.com/wp-content/uploads/2018/02/Node-js-API-JWT-Authentication-Tutorial.jpg
See: https://appdividend.com/2018/02/07/node-js-jwt-authentication-tutorial-scratch/

### Usage

#### Making Changes

Making changes are simple! Follow these steps..

1) `git clone <this_url> && cd <repo_name>`  
2) `npm install` then setup your .env file
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
