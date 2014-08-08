/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    less: {
      production: {
        options: {
          paths: ["assets/less"],
          cleancss: true
        },
        files: {
          "assets/css/app.css": "assets/less/app.less"
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist_js: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap/dist/js/bootstrap.js',
          'assets/js/app.js'
        ],
        dest: 'public/js/<%= pkg.name %>.js'
      },
      dist_css: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.css',
          'bower_components/font-awesome/css/font-awesome.css',
          'assets/css/app.css'
        ],
        dest: 'public/css/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist_js.dest %>',
        dest: 'public/js/<%= pkg.name %>.min.js'
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      dist: {
        src: '<%= concat.dist_css.dest %>',
        dest: 'public/css/<%= pkg.name %>.min.css'
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: 'bower_components/font-awesome/fonts/**',
            dest: 'public/fonts/',
            filter: 'isFile'
          },
          {
            expand: true,
            flatten: true,
            src: 'assets/images/**',
            dest: 'public/images/',
            filter: 'isFile'
          }
        ]
      }
    },
    watch: {
      less: {
        files: ['assets/less/*.less'],
        tasks: ['css'],
        options: {
          spawn: false,
        },
      },
      js: {
        files: ['assets/js/*.js'],
        tasks: ['js'],
        options: {
          spawn: false,
        },
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['less', 'concat', 'uglify', 'cssmin', 'copy']);
  grunt.registerTask('css', ['less', 'concat:dist_css', 'cssmin']);
  grunt.registerTask('js', ['concat:dist_js', 'uglify']);

};
