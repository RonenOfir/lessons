
ssh root@185.241.7.183
Lessons nest.js project 
------------------------
cd..
cd home/lightquote/www/lessons

git pull 

nest build 

the command to run on cmd for test the app: 
node dist/main 


sh deploy.sh deploy

service nginx restart 

TEST!!
--------------------------
http://185.241.7.183:8080/
http://185.241.7.183:8080/pdf/1666593279.pdf
http://185.241.7.183:8080/pdfresponsetextf/1666622886755.txt

http://localhost:3000/promise/1666243161.pdf

http://localhost:3000/responsetext/1666684015643.txt



find /home/lightquote/www/lessons/uploads -type d -exec chmod 777 {} \;