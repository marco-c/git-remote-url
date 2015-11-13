'use strict';

var assert = require('assert');
var childProcess = require('child_process');
var temp = require('temp').track();

var gitRemoteUrl = require('../index.js');

describe('git-remote-url', function() {
  var oldWD = process.cwd();

  beforeEach(function() {
    var dirPath = temp.mkdirSync('git-remote-url');
    process.chdir(dirPath);
  });

  afterEach(function() {
    process.chdir(oldWD);
  });

  it('returns the correct URL', function() {
    childProcess.execSync('git init');
    childProcess.execSync('git remote add origin https://github.com/marco-c/git-remote-url.git');

    return gitRemoteUrl('./', 'origin').then(function(url) {
      assert.equal(url, 'https://github.com/marco-c/git-remote-url.git');
    });
  });
});
