angular-flash 
=============


Demo
----------------
[angular-flash](http://sachinchoolur.github.io/lightslider/)



#### How to use angular-flash? ####

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
        Flash.add('success', message, 'custom-class');
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
