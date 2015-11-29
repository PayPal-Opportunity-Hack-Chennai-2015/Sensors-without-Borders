# CATS

Current Activity Tracking System

## Installation

```sh
npm install bower grunt-cli -g
npm install && bower install
```

## Starting dev server

```sh
export COMMCARE_USERNAME=xxxxxx@gmail.com
export COMMCARE_PASSWORD=xxxxxx
export MONGODB_URI='mongodb://localhost/cats'
npm start
```

## To Download CommCare Data

```sh
export COMMCARE_USERNAME=xxxxxx@gmail.com
export COMMCARE_PASSWORD=xxxxxx
node lib/downloadForms.js
```
