const sass = require('node-sass');

module.exports = function(grunt){

	// Configuração do projeto
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

		// WATCH
		watch:{
			styles:{
				files:[
					'dynamic/scss/**/*.scss',
					'dynamic/js/*.js'
				],
				tasks:['sass:dev','postcss','uglify']
			}
		},

		sass: {
			dev: {
				options: {
						implementation: sass,
				    style: 'compact'
				},
				files: {
				    'static/css/main.css': 'dynamic/scss/main.scss'
				}
			},
		},

    postcss: {
			options: {
				processors: [
					require('pixrem')(),
					require('autoprefixer')({browsers: 'last 2 versions'}),
					require('cssnano')()
				]
			},
			dev: {
				src: 'static/css/main.css'
			}
		},

		// UGLIFY
		uglify: {
			options: {
				mangle: false,
				beautify:false,
			},
			my_target: {
				files: {
				'static/js/main.js': ['dynamic/js/main.js']
				}
			}
		},

		// NOTIFY
		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 5,
				title: "Grunt task",
				success: true,
				duration: 3
			}
		},

    clean: {
			dist: {
				src: ['dist']
			}
		},

		copy: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'static/',
						src: '**/*',
						dest: 'dist/static/'
					},
					{
						expand: true,
						dot: true,
						cwd: './',
						dest: 'dist/',
						src: [
							'favicon.png',
							'index.html'
						]
					}
				]
            }
        },

	});

	// Carrega os plugins
	grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.task.run('notify_hooks');

	// Tarefas padrão
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('compile', ['sass:dev','uglify','clean','copy','postcss']);

};
