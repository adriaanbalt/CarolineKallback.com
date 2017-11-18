var paths = {
	js: ['app/Assets/js/**/*.js'],
	html: ['app/views/**/*.hbs'],
	css: ['app/scss/mixins/*.scss', 'app/scss/*.scss'],
	data: ['app/data/**/*.json']
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
						'<%= directory.dist %>/*'
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
						'Assets/css/**/*',
						'Assets/js/**/*',
						'Assets/images/**/*',
						'media/**/*'
					]
				}]
			}
		},

		// Compass
		// Generates the CSS from SCSS files
		// https://github.com/gruntjs/grunt-contrib-compass
		compass: {
			dist: {
				options: {
					sassDir: '<%= directory.app %>/scss',
					cssDir: '<%= directory.dist %>/Assets/css',
					imagesDir: '<%= directory.dist %>/Assets/images',
					javascriptDir: '<%= directory.dist %>/Assets/js',
					relativeAssets: false,
					outputStyle: 'expanded'
				}
			}
		},

		// CSSmin
		// Minifies css files
		// https://github.com/gruntjs/grunt-contrib-cssmin
		cssmin: {
			combine: {
				files: {
					'<%= directory.dist %>/Assets/css/<%= pkg.name %>.min.css': ['<%= directory.dist %>/Assets/css/<%= pkg.name %>.css']
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
			src: ['<%= directory.dist %>/Assets/css/**/*/css']
		},

		// Assemble
		// Static site generator for Node.js, Grunt.js, and Yeoman (and soon, Gulp).
		// https://github.com/assemble/assemble
		assemble: {
			dist: {
				options: {
					assets: '<%= directory.dist %>',
					partials: ['<%= directory.app %>/views/partials/**/*.hbs'],
					layout: ['<%= directory.app %>/views/layouts/default.hbs'],
					data: ['<%= directory.app %>/data/**/*.json'],
					production: true,
					pages: ['<%= directory.app %>/views/pages/**/*.hbs']
				},
				files: [{
					expand: true,
					src: ['**/*.hbs'],
					cwd: '<%= directory.app %>/views/pages/',
					dest: '<%= directory.dist %>'
				}]
			}
		},

		// Grunt Connect
		// https://github.com/gruntjs/grunt-contrib-connect
		// Used to create a static web server for dist
		connect: {
			options: {
				port: 7001,
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
				files: paths.js,
				tasks: ['clean:dist'],
				options: {
					livereload: true
				}
			},
			html: {
				files: paths.html,
				tasks: ['assemble:dist'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: paths.css,
				tasks: ['compass'],
				options: {
					livereload: true
				}
			},
			json: {
				files: paths.data,
				tasks: ['assemble:dist'],
				options: {
					livereload: true
				}
			}
		},

		// Concurrent
		// Allow multiple tasks to occur at once
		// https://github.com/sindresorhus/grunt-concurrent
		concurrent: {
			dist: ['watch','connect:dist'],
			options: {
				logConcurrentOutput: true
			}
		}

	});

	require('load-grunt-tasks')(grunt,{
		pattern: ['grunt-*', 'assemble']
	});

	// Development grunt task
	grunt.registerTask('build', [
		// Cleanup Previously Generated Files
		'clean:dist',

		// Sass compilation
		'compass:dist',

		// Copy HTML and assets
		'copy:dist',

		// Ensure no CSS errors
		'csslint'
	]);

	// Development grunt task
	grunt.registerTask('dev', [

		'build',

		// Assemble the HTML files
		'assemble:dist',

		// Runs both WATCH and CONNECT
		'concurrent:dist'
	]);

	// Development grunt task
	grunt.registerTask('dist', [
		
		'build',

		// CSS minification
		'cssmin',

		// Assemble the HTML files
		'assemble:dist',

		// Runs both WATCH and CONNECT
		'concurrent:dist'
	]);

};