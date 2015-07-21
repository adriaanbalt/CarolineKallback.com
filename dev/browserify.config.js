//third party libraries alias configurations for browserify
var vendorPath = "./app/assets/js/vendor/";

module.exports = [
    vendorPath + 'angular.js:angular',
    vendorPath + 'angular-route.js:angular-route',
    vendorPath + 'angular-cookies.js:angular-cookies',
    vendorPath + 'jquery.js:jquery'
];
