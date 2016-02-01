![license](https://img.shields.io/npm/l/angular-flash-alert.svg)
![travis](https://travis-ci.org/sachinchoolur/angular-flash.svg?branch=master)
![bower](https://img.shields.io/bower/v/angular-flash-alert.svg)
![npm](https://img.shields.io/npm/v/angular-flash-alert.svg)
# angular-flash 
A simple lightweight flash message module for AngularJS and Bootstrap.﻿


Demo
----------------
[angular-flash](http://sachinchoolur.github.io/angular-flash/) | [jsfiddle](http://jsfiddle.net/sachin377/1azz4xya/) | [codepen](http://codepen.io/sachinchoolur/pen/vEyyjZ)



How to use 
---

#### npm

You can also find angular-flash on [npm](http://npmjs.org)

```sh
$ npm install angular-flash-alert
```

#### Bower

You can Install angular-flash using the [Bower](http://bower.io) package manager.

```sh
$ bower install angular-flash-alert --save
```

Add the Following code to the &lt;head&gt; of your document.
```html
<link type="text/css" rel="stylesheet" href="dist/angular-flash.min.css" />
// If you are using bootstrap v3 no need to include angular-flash.css
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
<script src="dist/angular-flash.min.js"></script>
// Do not include both angular-flash.js and angular-flash.min.js
```
Add `ngFlash` dependency to your module
```javascript
var myApp = angular.module("app", ["ngFlash"])
```
Include directive below in your HTML template.
```html
<flash-message duration="5000"></flash-message> 
<!-- 5000ms as the default duration to show flash message.
-->
```
Inject the `Flash` factory in your controller
```javascript
myApp.controller('demoCtrl', ['Flash', function(Flash) {
    $scope.successAlert = function () {
        var message = '<strong>Well done!</strong> You successfully read this important alert message.';
        Flash.create('success', message, 0, 'custom-class');
        // First argument is the type of the flash alert
        // Second argument is the message displays in the flash alert (HTML ok)
        // Third argument (optional) is the duration of showing the flash. 0 to not automatically hide flash (user needs to click the cross on top-right corner).
        // Fourth argument (optional) is the custom class to be added for the flash message created
    }
}]);
```
####Flash types####
+ success
+ info
+ warning
+ danger

#### Methods ####
These methods are mostly for internal usage but can be used also from outside.

``` javascript
Flash.pause(4);
// Pause the fifth flash' auto dismiss.
Flash.dismiss(1);
// Dismiss the second flash shown
```
#### [Guidelines for contributors](https://github.com/sachinchoolur/angular-flash/blob/master/contributing.md)

#### Running tests
```
npm install
./node_modules/karma/bin/karma start
```

#### Contributors
* [Sachin Choluur](https://github.com/sachinchoolur) (Original author)
* [Roope Hakulinen](https://github.com/RoopeHakulinen) (Version 2)

#### License
MIT © [Sachin Choluur](https://twitter.com/sachinchoolur)
