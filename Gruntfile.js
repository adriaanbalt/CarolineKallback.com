var paths = {
	js: ['app/vendor/**/*.js', 'app/global/**/*.js', 'app/pages/**/*.js', 'app/assets/components/**/*.js'],
	html: ['app/pages/**/*.html'],
	css: []
};

module.exports = function(grunt) {
	'use strict';

	require('time-grunt')(grunt);

	grunt.initConfig({

		// Package Info
		pkg: grunt.file.readJSON('package.json'),

		// Configurable App Directories
		directory: {
			app: 'app',
			dist: 'dist',
			root: ''
		},

		// Grunt Clean
		// Clear files and folders that are auto generated
		// https://github.com/gruntjs/grunt-contrib-clean
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'<%= directory.dist %>/*',
						'<%= directory.app %>/assets/styles/*',
						'<%= directory.app %>/assets/js/*'
					]
				}]
			}
		},

		// Grunt Copy
		// Copies files and folders
		// https://github.com/gruntjs/grunt-contrib-copy
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= directory.app %>',
					dest: '<%= directory.dist %>',
					src: [
						'*.{ico,png,txt,html}',
						'.htaccess',
						'assets/data/**/*',
						'assets/fonts/**/*',
						'assets/img/**/*',
						'assets/video/**/*',
						'pages/**/*.html'
					]
				}]
			}
		},

		// Concat
		// Concatenates JS from multiple files
		// https://github.com/gruntjs/grunt-contrib-concat
		concat: {
			dist: {
				src: ['<%= directory.app %>/vendor/**/*.js', '<%= directory.app %>/global/**/*.js', '<%= directory.app %>/pages/**/*.js', '<%= directory.app %>/assets/components/**/*.js'],
				dest: '<%= directory.app %>/assets/js/<%= pkg.name %>.js',
			},
		},

		// JSHint
		// Makes sure the JS is correct
		// https://github.com/gruntjs/grunt-contrib-jshint
		// jshint: {

		// },

		// Compass
		// Generates the CSS from SCSS files
		// https://github.com/gruntjs/grunt-contrib-compass
		compass: {
			app: {
				options: {
					sassDir: '<%= directory.app %>',
					cssDir: '<%= directory.app %>/assets/styles',
					imagesDir: '<%= directory.app %>/assets/img',
					javascriptDir: '<%= directory.app %>/assets/js',
					fontsDir: '<%= directory.app %>/assets/fonts',
					relativeAssets: false,
					outputStyle: 'compressed'
				}
			}
		},

		// CSSmin
		// Minifies css files
		// https://github.com/gruntjs/grunt-contrib-cssmin
		cssmin: {
			combine: {
				files: {
					'<%= directory.dist %>/assets/styles/<%= pkg.name %>.min.css': ['<%= directory.app %>/assets/styles/**/*.css']
				}
			}
		},

		// CssLint
		// To ensure there are no parsing errors in the CSS
		// https://github.com/gruntjs/grunt-contrib-csslint
		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			src: ['<%= directory.dist %>/css/main.css','<%= directory.dist %>/css/print.css']
		},

		// Uglify
		// Minifies JS files
		// https://github.com/gruntjs/grunt-contrib-uglify
		uglify: {
            options: {
                mangle: false
            },
			dist: {
				files: {
					'<%= directory.dist %>/assets/js/<%= pkg.name %>.min.js': ['<%= directory.app %>/assets/js/<%= pkg.name %>.js']
				}
			}
		},

		// Grunt Connect
		// https://github.com/gruntjs/grunt-contrib-connect
		// Used to create a static web server for dev
		connect: {
			options: {
				port: 9001,
				keepalive: true,
				hostname: 'localhost'
			},
			dist: {
				options: {
					open: true,
					base: 'dist'
				}
			}
		},

		// Watch
		// Watches for changes to specific files
		// https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			js: {
				files: ['<%= directory.app %>/vendor/**/*.js', '<%= directory.app %>/global/**/*.js', '<%= directory.app %>/pages/**/*.js', '<%= directory.app %>/components/**/*.js'],
				tasks: ['concat:dist','uglify:dist'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['<%= directory.app %>/*.html', '<%= directory.app %>/pages/**/*.html'],
				tasks: ['newer:copy:dist'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: ['<%= directory.app %>/global/**/*.scss','<%= directory.app %>/components/**/*.scss','<%= directory.app %>/pages/**/*.scss'],
				tasks: ['compass'],
				options: {
					livereload: true
				}
			}
		},

		// Concurrent
		// Allow multiple tasks to occur at once
		// https://github.com/sindresorhus/grunt-concurrent
		concurrent: {
			dev: ['watch','connect:dev'],
			dist: ['watch','connect:dist'],
			options: {
				logConcurrentOutput: true
			}
		}

	});

	require('load-grunt-tasks')(grunt);

	// Development grunt task
	grunt.registerTask('dev', [
		// Cleanup Previously Generated Files
		'clean:dist',

		// Concat
		'concat:dist',

		// Minify JS
		'uglify:dist',

		// Sass compilation and sprite generation
		'compass',

		// Copy HTML and assets
		'copy:dist',

		// combine CSS files after complication
		'cssmin',

		// Ensure no CSS errors
		'csslint',

		// Runs both WATCH and CONNECT
		'concurrent:dist'
	]);

};



