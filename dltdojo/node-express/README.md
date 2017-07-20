### dltdojo/node-express:6

```
$ docker build -t dltdojo/node-express:6 .
$ docker push dltdojo/node-express:6
$ docker run -p 8900:8900 -v $(pwd)/server:/usr/src/app/server dltdojo/node-express:6 nodemon server
```