![license](https://img.shields.io/npm/l/angular-flash-alert.svg)
![travis](https://travis-ci.org/sachinchoolur/angular-flash.svg?branch=master)
![bower](https://img.shields.io/bower/v/angular-flash-alert.svg)
![npm](https://img.shields.io/npm/v/angular-flash-alert.svg)
# angular-flash 
A simple lightweight flash message module for angularjs.﻿


Demo
----------------
[angular-flash](http://sachinchoolur.github.io/angular-flash/) | [jsfiddle](http://jsfiddle.net/sachin377/1azz4xya/) | [codepen](http://codepen.io/sachinchoolur/pen/vEyyjZ)



How to use 
---
#### Bower

You can Install angular-flash using the [Bower](http://bower.io) package manager.

```sh
$ bower install angular-flash-alert --save
```

#### npm

You can also find angular-flash on [npm](http://npmjs.org)

```sh
$ npm install angular-flash-alert
```

Add the Following code to the &lt;head&gt; of your document.
```html
<link type="text/css" rel="stylesheet" href="css/angular-flash.min.css" />
// If you are using bootstrap v3 no need to include angular-flash.css
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js"></script>
<script src="angular-flash.min.js"></script>
// Do not include both angular-flash.js and angular-flash.min.js
```
Add `flash` dependency to your module
```javascript
var myApp = angular.module("app", ["flash"])
```
Include `<div flash-message="5000" ></div>` directive in your html template.
```html
<div flash-message="5000" ></div> 
<!-- 5000 milli-secs is the display duration.
     Flash alert will be automatically dismissed after 5000 milli-secs.
-->
```
Inject the `Flash` factory in your controller
```javascript
myApp.controller('demoCtrl', ['Flash', function(Flash) {
    $scope.successAlert = function () {
        var message = '<strong>Well done!</strong> You successfully read this important alert message.';
        Flash.create('success', message, 'custom-class');
        // First argument (success) is the type of the flash alert
        // Second argument (message) is the message displays in the flash alert
        // you can inclide html as message (not just text)
        // Third argument (custom-class) is the custom class for the perticular flash alert
    }
}]);
```
####flash alert types####
+ success
+ info
+ warning
+ danger

#### Methods ####
``` javascript
Flash.pause();
// Pause flash auto dismiss.
Flash.dismiss()
// Dismiss the flash
```
#### [guidelines for contributors](https://github.com/sachinchoolur/angular-flash/blob/master/contributing.md)

#### MIT © [Sachin](https://twitter.com/sachinchoolur)
