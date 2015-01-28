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
			alt: 'app',
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
			},
			styles: {
				files: [{
					dot: true,
					src: [
						'<%= directory.app %>/assets/styles/*'
					]
				}]
			},
			js: {
				files: [{
					dot: true,
					src: [
						'<%= directory.app %>/assets/js/*'
					]
				}]
			},
			json: {
				files: [{
					dot: true,
					src: [
						'<%= directory.app %>/assets/json/*'
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
						'assets/fonts/**/*',
						'assets/img/**/*',
						'assets/video/**/*',
						'pages/**/*.html',
						'components/**/*.html',
						'!global/**/*.html'
					]
				}]
			}
		},

		// Concat
		// Concatenates JS from multiple files
		// https://github.com/gruntjs/grunt-contrib-concat
		concat: {
			dist: {
				src: ['<%= directory.app %>/vendor/**/*.js', '<%= directory.app %>/global/**/*.js', '<%= directory.app %>/pages/**/*.js', '<%= directory.app %>/components/**/*.js'],
				dest: '<%= directory.dist %>/assets/js/<%= pkg.name %>.js',
			}
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
			src: ['<%= directory.alt %>/css/main.css','<%= directory.alt %>/css/print.css']
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

		// Assemble
		// Static site generator for Node.js, Grunt.js, and Yeoman (and soon, Gulp).
		// https://github.com/assemble/assemble
		assemble: {
			dist: {
				options: {
					assets: '<%= directory.dist %>',
					partials: ['<%= directory.app %>/views/partials/**/*.hbs'],
					layout: ['<%= directory.app %>/views/layouts/default.hbs'],
					data: ['directory.app %>/assets/data/**/*.json'],
					production: false,
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
		// Used to create a static web server for dev
		connect: {
			options: {
				port: 7002,
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
				tasks: ['clean:js','concat:dist'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['<%= directory.app %>/*.html', '<%= directory.app %>/pages/**/*.html', '<%= directory.app %>/components/**/*.html', '<%= directory.app %>/views/**/*.hbs' ],
				tasks: ['newer:copy:dist','assemble'],
				options: {
					livereload: true
				}
			},
			styles: {
				files: ['<%= directory.app %>/global/**/*.scss','<%= directory.app %>/components/**/*.scss','<%= directory.app %>/pages/**/*.scss'],
				tasks: ['clean:styles','compass','cssmin'],
				options: {
					livereload: true
				}
			},
			json: {
				files: ['<%= directory.app %>/assets/data/**/*.json'],
				tasks: ['assemble'],
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
	grunt.registerTask('dev', [
		// Cleanup Previously Generated Files
		'clean',

		// Concat the JS
		'concat',

		// Minify JS
		// 'uglify:dist',

		// Sass compilation
		'compass',

		// html compilation
		'assemble',

		// Copy HTML and assets
		'copy',

		// combine CSS files after complication
		'cssmin',

		// Ensure no CSS errors
		'csslint',

		// Runs both WATCH and CONNECT
		'concurrent'
	]);

};



