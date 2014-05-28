module.exports = function(grunt) {
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    dir: {
        base: './',
        base_js: '<%= dir.base %>' + 'js/',
        base_img: '<%= dir.base %>' + 'img/',
        base_sass: '<%= dir.base %>' + 'scss/',
        base_css: '<%= dir.base %>' + 'css/',
        base_fonts: '<%= dir.base %>' + 'fonts/'
    },
    
    jshint: {
      files: [
          '<%=dir.base_js%>/collections/**/*.js',
          '<%=dir.base_js%>/models/**/*.js',
          '<%=dir.base_js%>/views/**/*.js',
          '<%=dir.base_js%>/app.js',
          '<%=dir.base_js%>/build.js',
          '<%=dir.base_js%>/router.js',
          '<%=dir.base_js%>/defaults.js'
      ],
      options: {
        curly:      true,
        eqeqeq:     true,
        immed:      true,
        latedef:    true,
        noarg:      true,
        sub:        true,
        undef:      true,
        boss:       true,
        eqnull:     true,
        browser:    true,
        multistr:   true,
        newcap:     false,
        unused:     true,
        undef:      true,
        globals: {
            define:       true,
            require:      true,
            Modernizr:    true
        }
      }
    },
    
    requirejs: {
        compile: {
            options: {
                baseUrl: '<%= dir.base_js %>',
                mainConfigFile: '<%= dir.base_js %>/build.js',
                name: 'build',
                out: '<%= dir.base_js%>/app.min.js',
                findNestedDependencies: true,
                preserveLicenseComments: false
            }
        }
    },
    
    compass: {
      all: {
        options: {
          sassDir: 'scss',
          imagesDir: 'img',
          javascriptsDir: 'js',
          fontsDir: 'fonts',
          cssDir: 'css',
          require: ['compass-normalize', 'rgbapng'],
          relativeAssets: true,
          raw: 'preferred_syntax = :scss\n',
          environment: 'development',
          outputStyle: 'expanded'
        }
      },
      deploy: {
        options: {
          sassDir: 'scss',
          imagesDir: 'img',
          javascriptsDir: 'js',
          fontsDir: 'fonts',
          cssDir: 'css',
          require: ['compass-normalize', 'rgbapng'],
          relativeAssets: true,
          raw: 'preferred_syntax = :scss\n',
          noLineComments: true,
          environment: 'production',
          outputStyle: 'compact'
        }
      }
    },
    
    watch: {
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['js']
      },
      sass: {
        files: ['<%= dir.base_sass%>/**/*.scss'],
        tasks: ['sass']
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('js', ['jshint','requirejs']);

  grunt.registerTask('sass', ['compass:all']);
  
  grunt.registerTask('default', ['jshint','requirejs','compass:all']);
  
  grunt.registerTask('deploy', ['jshint','requirejs','compass:deploy']);

};