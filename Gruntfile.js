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
				tasks:['compass','uglify']
			}
		},

		// SASS
		compass: {
			dist: {
				options: {
				sassDir: 'dynamic/scss/',
				cssDir: 'static/css/',
				outputStyle:'compressed',
				environment: 'development',
				specify: 'dynamic/scss/main.scss'
				}
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
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.task.run('notify_hooks');

	// Tarefas padrão
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('compile', ['compass','uglify','clean','copy']);

};
