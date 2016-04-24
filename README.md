![license](https://img.shields.io/npm/l/angular-flash-alert.svg)
![travis](https://travis-ci.org/sachinchoolur/angular-flash.svg?branch=master)
![bower](https://img.shields.io/bower/v/angular-flash-alert.svg)
![npm](https://img.shields.io/npm/v/angular-flash-alert.svg)
# angular-flash 
A simple lightweight flash message module for AngularJS and Bootstrap.﻿


## Demo
[angular-flash](http://sachinchoolur.github.io/angular-flash/) | [jsfiddle](http://jsfiddle.net/roopehakulinen/uxeg4nze/) | [codepen](http://codepen.io/RoopeHakulinen/pen/QyZjxm)



## Install

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
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="dist/angular-flash.min.js"></script>
// Do not include both angular-flash.js and angular-flash.min.js
```
Add `ngFlash` dependency to your module
```javascript
var myApp = angular.module("app", ["ngFlash"])
```
Include directive below in your HTML template.
```html
<flash-message></flash-message> 
```

## Configure
You can configure angular-flash by two ways:

Add attributes on the `<flash-message>` directive.
```html
<flash-message
    duration="5000"
    show-close="true"
    on-dismiss="myCallback(flash);"
></flash-message> 
<!-- 
5000ms as the default duration to show flash message.
Show the close button (x on the right).
Call myCallback with flash dismissed as parameter when flash has been dismissed.
-->
```

Set configuration with `flashProvider`.
```javascript
app.config((FlashProvider) => {
    FlashProvider.setTimeout(5000);
    FlashProvider.setShowClose(true);
    FlashProvider.setOnDismiss(myCallback);
});
```

#### Use a custom template

By default, angular-flash use the Bootstrap flash standard template, but you can set your own template.

**By giving it in the Js**: use `.setTemplate(...)` with the template in parameter.
```javascript
app.config((FlashProvider) => {
    FlashProvider.setTemplate(`
        <div class="my-flash">{{ flash.text }}</div>
    `);
});
```

**By giving it in the HTML**: use `.setTemplatePreset('transclude')` with the template transcluded in the `<flash-message>` directive.
```javascript
app.config((FlashProvider) => {
    FlashProvider.setTemplatePreset('transclude');
});
```
```html
<flash-message>
    <div class="my-flash">{{ flash.text }}</div>
</flash-message>
```

## How to use
Inject the `Flash` factory in your controller
```javascript
myApp.controller('demoCtrl', ['Flash', function(Flash) {
    $scope.successAlert = function () {
        var message = '<strong>Well done!</strong> You successfully read this important alert message.';
        var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
        // First argument (string) is the type of the flash alert.
        // Second argument (string) is the message displays in the flash alert (HTML is ok).
        // Third argument (number, optional) is the duration of showing the flash. 0 to not automatically hide flash (user needs to click the cross on top-right corner).
        // Fourth argument (object, optional) is the custom class and id to be added for the flash message created. 
        // Fifth argument (boolean, optional) is the visibility of close button for this flash.
        // Returns the unique id of flash message that can be used to call Flash.dismiss(id); to dismiss the flash message.
    }
}]);
```
####Flash types####
+ success
+ info
+ warning
+ danger

#### Methods
These methods are mostly for internal usage but can be used also from outside.

``` javascript
Flash.dismiss(1);
// Dismiss the flash with id of 1. Id is not the index of flash but instead a value returned by Flash.create()
```

``` javascript
Flash.clear();
// Dismisses all flashes shown.
```

#### Animating
You can animate the flash messages via traditional Angular way by including _ngAnimate_ as a dependency of your application and then defining the CSS transitions for different classes (_ng-enter_, _ng-move_, _ng-leave_) provided by Angular.

Example:
```
.alert.ng-leave {
  opacity: 1;
  transition: opacity 1.5s ease-out;
}
.alert.ng-leave-active {
  opacity: 0;
}
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
* [Nicolas Coden](https://github.com/ncoden)

#### License
MIT © [Sachin Choluur](https://twitter.com/sachinchoolur)
