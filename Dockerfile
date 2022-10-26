

****************************************************************
Its Not On The Docker !!
Only in system.d + /root/lessons/dist for
****************************************************************


FROM node:16.17.0 

WORKDIR /code/
ENV PORT 7000 

COPY package.json /code/package.json    
RUN npm install

COPY . /code/
ADD dist /code/

CMD ["node", "dist/main"]