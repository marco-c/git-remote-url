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

  it('returns the correct URL when there\'s a single remote', function() {
    childProcess.execSync('git init');
    childProcess.execSync('git remote add origin https://github.com/marco-c/git-remote-url.git');

    return gitRemoteUrl('./', 'origin').then(function(url) {
      assert.equal(url, 'https://github.com/marco-c/git-remote-url.git');
    });
  });

  it('returns the correct URLs when there are multiple remotes', function() {
    childProcess.execSync('git init');
    childProcess.execSync('git remote add origin https://github.com/marco-c/git-remote-url.git');
    childProcess.execSync('git remote add upstream https://github.com/marco-c/ahahah.git');

    return Promise.all([
      gitRemoteUrl('./', 'origin').then(function(url) {
        assert.equal(url, 'https://github.com/marco-c/git-remote-url.git');
      }),
      gitRemoteUrl('./', 'upstream').then(function(url) {
        assert.equal(url, 'https://github.com/marco-c/ahahah.git');
      }),
    ]);
  });

  it('returns the correct URLs when there\'s no origin remote', function() {
    childProcess.execSync('git init');
    childProcess.execSync('git remote add remote1 https://github.com/marco-c/remote1.git');
    childProcess.execSync('git remote add remote2 https://github.com/marco-c/remote2.git');

    return Promise.all([
      gitRemoteUrl('./', 'remote1').then(function(url) {
        assert.equal(url, 'https://github.com/marco-c/remote1.git');
      }),
      gitRemoteUrl('./', 'remote2').then(function(url) {
        assert.equal(url, 'https://github.com/marco-c/remote2.git');
      }),
    ]);
  });

  it('fails when the directory isn\'t a git repository', function() {
    return gitRemoteUrl('./', 'origin').then(function(url) {
      assert(false);
    }, function() {
      assert(true);
    });
  });

  it('fails when the repository doesn\'t have the specified remote', function() {
    childProcess.execSync('git init');
    childProcess.execSync('git remote add origin https://github.com/marco-c/git-remote-url.git');

    return gitRemoteUrl('./', 'upstream').then(function(url) {
      assert(false);
    }, function() {
      assert(true);
    });
  });
});
