### 新增 react app

bob5是已完成供比對參考的app，另外取名建立app。

```
$ pwd
/home/dltdojo/smb/container/dltdojo/rise/fullstack
$ sudo npm i -g create-react-app
$ create-react-app bob2 && cd bob2
```

### 啟動 react app

```
$ npm start

# Build to 'build' directory (it's ignored by git, see .gitignore)
npm run build
# Start the express.js app
node server
```

### 啟動資料庫並新增資料

```
$ docker-compose up -d db
$ docker-compose up -d phpmyadmin
```

* phpmyadmin http://DEVIP:8088/
* phpmyadmin 伺服器: db - SQL - 在伺服器 "db" 執行 SQL 查詢: 
* username: root
* password: root

```
CREATE DATABASE mydb;
use mydb;
CREATE TABLE mytable ( id INT PRIMARY KEY, name VARCHAR(34) , balance INT UNSIGNED );
INSERT INTO mytable VALUES ( 1, "mpywCp28LcmDHNKxJy9tUuXc1LcXK5gCoT", 1000);
INSERT INTO mytable VALUES ( 2, "mjisABTPq6DwgUv4rzBtt1gY44hwBX4zZy", 2000);
SELECT * FROM mytable;
```

### api up

* api server http://DEVIP:8900/

```
$ docker-compose up -d api
$ docker-compose ps

      Name             Command             State              Ports
-------------------------------------------------------------------------
fullstack_api_1    sh -c sleep 10     Up                 0.0.0.0:8900->89
                   && nodemon  ...                       00/tcp
fullstack_db_1     docker-            Up                 3306/tcp
                   entrypoint.sh
                   mysqld
fullstack_phpmya   /run.sh            Up                 0.0.0.0:8088->80
dmin_1             phpmyadmin                            /tcp

```

### api test

```
$ curl -s http://localhost:8900/api | jq
{
  "data": [
    {
      "id": 1,
      "name": "mpywCp28LcmDHNKxJy9tUuXc1LcXK5gCoT",
      "balance": 1000
    },
    {
      "id": 2,
      "name": "mjisABTPq6DwgUv4rzBtt1gY44hwBX4zZy",
      "balance": 2000
    }
  ]
}
```

### 

* React Getting Started — The MERN Stack Tutorial! (feat. ES6!)  https://medium.com/@bryantheastronaut/react-getting-started-the-mern-stack-tutorial-feat-es6-de1a2886be50