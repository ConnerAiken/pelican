FROM node:9

ENV DIR /app 

RUN mkdir -p ${DIR}
WORKDIR ${DIR} 

# You may be wondering why we copied package.json first.
# it is so we utilize docker's cached layers properly
COPY package.json /app
COPY ../pelican.env /app
RUN npm install
COPY . ${DIR} 
RUN chmod +x boot.sh
 

EXPOSE 80
EXPOSE 443
ENTRYPOINT [ "./boot.sh" ]