### Building Java Web Applications

* https://github.com/jaypee2016/SimpleServletGradleGretty
* https://github.com/duongphuhiep/servlet-jdbc-gradle-boilerplate
* https://guides.gradle.org/building-java-web-applications/

```
$ sudo apt-get install default-jdk
$ sudo apt-get install gradle
$ gradle wrapper --gradle-version=3.5
$ gradle tasks
Build tasks
-----------
assemble - Assembles the outputs of this project.
build - Assembles and tests this project.
buildDependents - Assembles and tests this project and all projects that depend on it.
buildNeeded - Assembles and tests this project and all projects it depends on.
classes - Assembles main classes.
clean - Deletes the build directory.
jar - Assembles a jar archive containing the main classes.
testClasses - Assembles test classes.
war - Generates a war archive with all the compiled classes, the web-app content and the libraries.

$ gradle war
```