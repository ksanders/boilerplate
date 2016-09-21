/*
 * grunt-init-basic
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, Jan Panschab, contributors
 * Licensed under the MIT license.
 */

'use strict';

// Nodejs libs.
var path = require('path');

// Basic template description.
exports.description = 'Create an HTML5Boilerplate project with grunt tasks.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ should be a unique ID. _Project ' +
    'title_ should be a human-readable title.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
    'install_. After that, you may execute project tasks with _grunt_. ';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

    init.process({
        type: 'basic'
    }, [
        // Prompt for these values.
        init.prompt('name'),
        init.prompt('title', function(value, data, done) {
            done(null, value);
        }),
        init.prompt('description', 'Best project ever.'),
        init.prompt('version','0.0.0'),
    ], function(err, props) {
        // A few additional properties.
        props.basicjson = props.name + '.json';

        props.keywords = [];

        // Files to copy (and process).
        var files = init.filesToCopy(props);


        // Actually copy (and process) files.
        init.copyAndProcess(files, props, {
            noProcess: 'libs/**'
        });

        // Generate package.json file, used by npm and grunt.
        init.writePackageJSON('package.json', {
            name: props.name,
            version: '0.0.0',
            // TODO: pull from grunt's package.json
            node_version: '>= 0.8.0',
            devDependencies: {
			    "csslint-stylish": "0.0.4",
			    "grunt": "^0.4.5",
			    "grunt-combine-media-queries": "^1.0.20",
			    "grunt-contrib-clean": "^1.0.0",
			    "grunt-contrib-concat": "^0.3.0",
			    "grunt-contrib-copy": "^0.5.0",
			    "grunt-contrib-csslint": "^1.0.0",
			    "grunt-contrib-cssmin": "^0.9.0",
			    "grunt-contrib-jshint": "^0.10.0",
			    "grunt-contrib-less": "^0.11.0",
			    "grunt-contrib-sass": "^1.0.0",
			    "grunt-contrib-uglify": "^0.4.1",
			    "grunt-contrib-watch": "^0.6.1",
			    "grunt-css-purge": "0.0.4",
			    "grunt-csscss": "^0.6.2",
			    "grunt-cssnano": "^2.1.0",
			    "grunt-mkdir": "^0.1.1",
			    "grunt-uncss": "^0.6.0",
			    "jshint-stylish": "^0.1.5",
			    "matchdep": "^0.3.0",
			    "time-grunt": "^0.3.1"
            },
        });

        // Generate project.json file.
        init.writePackageJSON(props.basicjson, props, function(pkg, props) {
            return pkg;
        });

        // All done!
        done();
    });

};