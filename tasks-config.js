//paths required by gulp tasks
var config = {
    //typescript compilation
    ts:{
        input: ["./src/app/**/*.ts", //path to typescript files
            "./tools/typings/**/*.ts"],//path to references .d.ts files
        output: "./public/compiled/js/",
        maps:"../maps"
    },

    //automate app.d.ts generation
    tsDef:{
        input:"./src/app/**/*.ts",
        output:"./tools/typings/app.d.ts",
        defDest: "./tools/typings/"
    },

    //compile less files
    less:{
        input:["./src/styles/style.less"],//Entry point to compile all less files, import files using less @import functionality
        output:"./public/compiled/css/",
        maps:"../maps"
    },

    //concatenates angular templates $templateCache
    ngViews:{
        input:["./src/app/views/**/*.html"],
        output:"./public/compiled/js/"
    }

};

//concatenate and uglify js dependencies; you need to write the dependencies in the correct order
config.jsLibs ={
    output:"./public/compiled/js/",
    maps:"../maps",
    input:[
        "./bower_components/angular/angular.js",
        "./bower_components/angular-route/angular-route.js",
        "./bower_components/angular-animate/angular-animate.js"
    ]
} ;

module.exports = config;