# Work log

## Billing Period One (Week 1) - 0 Remaining hours  
.5h -> Discussions about implementation/your vision   
.5h -> Setting up staging server, code repository and "web server" to handle server request   
.5h -> Setting up SSL certificates on the staging server so the API works correctly (Geolocation has unique requirements for security) and the site is secure.   
.5h -> Configuring the app to work as a PWA (Progressive Web App) and researching best options for libraries/google map's api   
2h -> Creating sample google maps component /w location tracking   

# Billing Period Two Week 2 - 0 Remaining hours  
1h -> Creating sample google maps component /w destination and directions   
.5h -> Setting up dynamic destination updates   
.5h -> Location lookup translation to address   
3h -> Setting up analytics, css frameworks, React Router and middleware functions   

# Billing Period Three (Week 3) - 1 hour banked/total of 6 available (8/28~ish)  
.25h -> Phone call /w Trulioo   
1.75h (9:00am-10:45am - 8/30/18) -> Setting up ansible deployment scripts    
.5h (10:45am-11:15am - 8/30/18) -> Setup mysql db   
.5h (11:15am-11:45am - 8/30/18) -> Refining ansible deployment scripts to use docker technology pt 1   
3h (1:15pm-4:15pm - 8/30/18) -> Refining ansible deploy scripts pt 2, start of JWT authentication and setting up SSL    certificates /w express (not automatically renewing at this point) 


# Billing Period Four 76 hours banked for 4 weeks - (9/4/2018)     

1.5h (Mon - 11am-12:30pm) -> Upgrading babel, researching on iOS html/css requirements.   
1h (Mon - 1:45pm-2:45pm -> attempting to make scroll viewport work correctly in iphone, build process changes for docker   
1.5h (Mon - 2:45pm-4:15pm) -> Starting on registration wireframe, layout done but no validation   
1.75h (Mon - 4:15pm-6pm) -> /register server endpoint, creates user account and logs in user account. Front end login request but force success redirect.   
2.25h (Saturday - 10:00am-12:15pm) -> Improving landing page css by adding flexbox, adding login validation using regex and hook registration form into server-side endpoint    
1.5h (Monday - 10:15am-11:45am) -> Breaking up address into parts: city, zip, line1, line2, state, country, etc. Adding further validation (message on bad login, duplicate user)
.5h (Monday - 5:15pm-5:45pm) -> Debugging issues /w connection pool    
4h (Monday - 8:15am-12:15pm) -> Enabling helmet for express for security headers, setting up jwt token validation, generating list of 502 stores for mock display and displaying markers on map, separting views for different maps based on user types   
5h (Thursday - 10:15am-3:15pm -> Mongodb vs mysql research and setting up Sequelize/ORM   
4h (Saturday - 8:30am-12:30am -> Setting up order/orderLog schema and start of order creation/order update api endpoints
6.5h (Sunday - 11:30am - 6pm ) -> Splitting dashboards into separate user views, file upload functionality (base64 encodes into db), db seeding script setup, adding slick loading screen component to signup, allow enter to login, login and initial dashboard loading processes
.5h     (Monday - 8:30am - 9am) -> Fixing react router issues on IOS, reworked with BrowserRouter
2h     (Monday - 9am-11am) -> Start of sidebar
6.5h     (Tuesday - 9:45am-3:45pm, 5:30pm-6:00pm) -> Sidebar work, creating new view controllers and architecture work, research, sample privacy policy
2h (Thursday sep 20 - 8:30-10:30am) => Research on sequelize.js and reviewing designs
1.5h (Friday sep 21 - 8:30-10:00am) => Working on verification workflow
.25h (Friday sep 21 - 1:30pm-1:45pm) => Trulioo sync
6.5h (Saturday sep 22 - 1:00pm-7:30pm) => Researching greenbits, setting up sample call in UI. Ran into CORS issue /w greenbits so created a server-api wrapper. Setting up authentication logging. Adding base64 encoded profile image to sidebar.
4.25h (Sundary sep 23 10:30am-2:30pm, 5:15pm-5:30pm) -> Setting up e2e testing suite, setting up more focused sql seed scripts on db model updates and adding THC/CBD % to menus. Ability to
add items to a invisible cart and it populates number in sidebar. Creating geolocation permission errors page. Adding new store icon to map. Adding actual item passing to cart through local storage.

.5h (Tuesday Sep 25th 8:30-9:00am) - Closer look at greenbits api, calling to verify token lifetime

.5h (Tuesday Sep 25th 9:30am-x) - Image asset preparation, progressive web app enhancements, continous integration changes. Setting up dynamic store endpoint queries (previousyl they were all hardcoded to one store). Working on adding a store.


Remaining  hours: 22.5  