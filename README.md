# git-remote-url
Get a remote URL of a git repository

[![Build Status](https://travis-ci.org/marco-c/git-remote-url.svg?branch=master)](https://travis-ci.org/marco-c/git-remote-url)
[![dependencies](https://david-dm.org/marco-c/git-remote-url.svg)](https://david-dm.org/marco-c/git-remote-url)
[![devdependencies](https://david-dm.org/marco-c/git-remote-url/dev-status.svg)](https://david-dm.org/marco-c/git-remote-url#info=devDependencies)


# API

The function exported by the module accepts two parameters:
- `directory`: the directory of the git repository;
- `remote`: the name of the remote you're interested in.

It returns a promise that resolves to the URL of the remote.


# Example

```JavaScript
var gitRemoteUrl = require('git-remote-url');

gitRemoteUrl('.', 'origin').then(function(url) {
  console.log('URL is ' + url);
});
```
