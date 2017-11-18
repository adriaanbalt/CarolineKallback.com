
# Caroline Kallback website

###Introduction

Caroline Kallback website.

### Node Modules

* [Grunt](http://gruntjs.com/)
* [Grunt-CLI](https://github.com/gruntjs/grunt-cli)
* [Compass](https://github.com/gruntjs/grunt-contrib-compass)
* [Concurrent](https://github.com/sindresorhus/grunt-concurrent)
* [Clean](https://github.com/gruntjs/grunt-contrib-clean)
* [Connect](https://github.com/gruntjs/grunt-contrib-connect)
* [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
* [grunt-contrib-csslint](https://github.com/gruntjs/grunt-contrib-csslint)
* [Watch / Live reload](https://github.com/gruntjs/grunt-contrib-watch)
* [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks)

### Libraries

* [Compass](http://compass-style.org/)
* [NPM](https://www.npmjs.com)
* [NVM](https://github.com/creationix/nvm)
* [RVM](https://github.com/creationix/nvm)
* [Node](http://nodejs.org/)

### Requirements
Make sure your have the following installed with these versions or greater when running the bootstrap

* ```Node v0.10.26```
* ```Sass v3.3.9```
* ```Compass >1.0.0.alpha.20```

### Installation

1. Pull the master version of this Git repository.

2. Run "grunt dist" in the root folder of Git repository.

3. This will open a localhost using CONNECT to allow you to review the compiled website based on the JSON files located in the "languages" folder.

4. To change language, click the language button in the header to reveal the modal and click the language you would like to view.

5. When ready, upload all files within the "dist" folder.

### File Paths

1. ```in /app/languages/*.json```
2. find variable "file-path"
3. change this variable to the path of the language sub-folder

For Example:

* for /nl-nl
* open /app/languages/nl-nl.json
* ```"file-path":"http://lp.sonos.com/bluenote/"```

Don't forget:

You must include trailing slash "/" of this variable.

### Tooling Dependencies

```
npm install
```

### Grunt Task(s)

### Dist
Runs the DIST task.  Compiles the languages into their corresponding folders in the /dist directory.

```
grunt dist
```

### Uploading to Host

1. Upload the contents of the "/dist" folder.

