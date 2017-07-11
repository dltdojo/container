### neo4j test

* https://github.com/straumat/blockchain2graph
* https://github.com/haw-itn/bitcoin2graphdb
* https://github.com/in3rsha/bitcoin-to-neo4j

### blockchain2graph

* https://github.com/straumat/blockchain2graph/wiki/Running-with-docker

After building the application with mvn clean package, go to the blockchain2graph source directory and type : docker-compose up -d.

You can bow see the blockchain2graph console at http://localhost:8080/blockchain2graph/ and the neo4j console at http://localhost:7474/browser/.

```
$ git clone https://github.com/straumat/blockchain2graph
$ cd blockchain2graph
$ mvn clean package
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 08:30 min
[INFO] Finished at: 2017-07-11T08:56:55+08:00
[INFO] Final Memory: 48M/137M
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-surefire-plugin:2.18.1:test (default-test) on project blockchain2graph: There are test failures.
[ERROR]
[ERROR] Please refer to /home/dltdojo/w1share/git/blockchain2graph/target/surefire-reports for the individual test results.
[ERROR] -> [Help 1]

```