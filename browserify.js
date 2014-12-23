'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');
var browserify = require('browserify');
var to5ify = require('6to5ify');

mkdirp.sync('./dist');

browserify({'debug': true, 'standalone': 'Emitter'})
  .transform(to5ify.configure({
    'modules': ['commonInterop']
  }))
  .require('./index.js', {'entry': true})
  .bundle()
  .on('error', function (err) { console.log('Error : ' + err.message); })
  .pipe(fs.createWriteStream('dist/build.js'));
