FROM node:16.17.0 

ENV PORT 7000 

RUN mkdir -p /opt/app
WORKDIR /opt/app/
COPY package-lock.json /opt/app/
COPY package-lock.json /opt/app/package-lock.json_orig 
COPY package.json /opt/app 
RUN npm install --only=production

COPY . /opt/app/
ADD dist /opt/app/

CMD ["node", "dist/main"]












