module.exports = function(grunt) {
	require('time-grunt')(grunt);
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		csslint: {
			options: {
			    formatters: [
			      {id: 'compact', dest: 'csslint.txt'},
			    ]
   			},
   		},

		sass : {// Task
			dev : {// Target
				files : {// Dictionary of files
					'public/css/main.css' : 'assets/sass/main.scss', // 'destination': 'source'
				}
			},
			prod : {// Target
				files : {// Dictionary of files
					'public/css/main.css' : 'assets/sass/main.scss', // 'destination': 'source'
				},
				options : {
					sourcemap: 'none'
				}
			}			
		},
		
		watch : {			

			sass : {
				files : [
					'assets/sass/**/*.scss',
				],
				tasks : ['clean:css','sass'],
				options : {
					spawn : true,
					interrupt : false,
					event : 'changed',
					interval : 500,
					debounceDelay : 500,
					//livereload : true,
				}
			},
			
			js : {
				files : [
					'assets/js/**/*.js'
				],
				tasks : ['jshint','concat:mainjs'],
				options : {
					spawn : true,
					interrupt : false,
					event : 'changed',
					interval : 2000,
					debounceDelay : 1000,
					livereload : true,
				}
			},
			
		},

		jshint : {
				options : {
					reporter : require('jshint-stylish'),
					browser : true,
					jquery : true,
			        reporterOutput: ""
				},
				main: ['assets/js/main.js']

		},
		uglify: {
			options: {
				mangle: false
			},
			js: {
				files: {
					'public/js/combined.js': ['public/js/combined.js']
				}
			}
		},
  
		concat : {
			options: {
			},
			mainjs : {
				src : [
					'assets/js/jquery-1.11.2.min.js',
					'assets/js/bootstrap.min.js',
					'assets/js/main.js'

				],
				
				dest : 'public/js/combined.js',
				//nonull: true,
			},
			modernizr : {
				src : [
					'assets/js/modernizr-2.8.3-respond-1.4.2.min.js.js',
				],
				
				dest : 'public/js/modernizr.js',
				//nonull: true,
			},
		},

		cssmin: {
			
			minify: {
				expand: true,
				options: {
					keepSpecialComments: 0
				},
				cwd: 'public/css/',
				src: ['main.css'],
				dest: 'public/css/',
			},
			
		},
		
		clean: {
			css: ['public/css/**/*'],
			js: ['public/js/**/*'],
		},
				
	});

	// Default task(s).
	grunt.registerTask('default', ['dev','watch']);
	grunt.registerTask('dev', ['clean','sass:dev','concat']);
	grunt.registerTask('prod', ['clean','sass:prod','concat','uglify','cssmin']);

}; 