module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            libs: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/jquery/dist',
                    src: ['jquery.min.js'],
                    dest: 'build/lib'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'src/html',
                    src: ['**'],
                    dest: 'build'
                }]
            },
            data: {
                files:[{
                    expand: true,
                    cwd: 'src/data',
                    src: ['**'],
                    dest: 'build/data'
                }],
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/start.js',
                dest: 'build/js/<%= pkg.name %>.min.js'
            },
        },

        ts: {
            default: {
                tsconfig: true
            },
        },

        watch: {
            ts: {
                cwd: 'src',
                files: ['**/*.ts'],
                tasks: ['ts', 'uglify'],
            },
            html: {
                cwd: 'src',
                files: [
                    '**/*.html'
                ],
                tasks: ['copy:html'],
            },
            less: {
                cwd: 'src',
                files: ['**/*.less'],
                tasks: ['less:build'],
            },
            data: {
                cwd: 'src/data',
                files: ['**/*'],
                tasks: ['copy:data'],
            },
        },

        open: {
            default: {
                path: 'http://localhost/typedsource/build',
                app: 'Chrome'
            }
        },

        browserSync: {
            bsFiles: {
                src: [
                    'build/**/*.html',
                    'build/**/<%= pkg.name %>.min.js',
                    'build/**/<%= pkg.name %>.css',
                    'build/data/**/*',
                ],
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "./build",
                    }
                }
            }
        },

        less: {
            build: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2,
                },
                files: {
                    "build/css/<%= pkg.name %>.css": 'src/less/base.less'
                }
            }
        },

        clean: {
            dev: {
                src: ['build', 'src/**/*.js', 'src/**/*.js.map'],
            },
            build: {
                src: ['build'],
            },
            js_files: {
                src: ['src/**/*.js', 'src/**/*.js.map'],
            }, 
            
        },

        fileExists: {
            scripts: ['build/js/<%= pkg.name %>.min.js', 'build/css/<%= pkg.name %>.css', 'build/index.html'],
        },

    });

    grunt.loadNpmTasks('grunt-file-exists');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('clean '['clean']);
    grunt.registerTask('create_js', ['ts', 'uglify', 'clean:js_files']);
    grunt.registerTask('install', ['less', 'create_js', 'copy']);
    grunt.registerTask('auto', ['fileExists', 'browserSync', 'watch']);

}
