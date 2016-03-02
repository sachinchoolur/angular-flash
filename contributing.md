# Contributing

## Important notes
Please don't edit files in the root directory of repository as they are generated via Grunt. You'll find source code in the `src` subdirectory!

### Code style
Regarding code style like indentation and whitespace, **follow the conventions you see used in the source already.** There is also a `.editorconfig` to apply styles on your IDE of choice.

## Modifying the code
First, ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

Test that Grunt's CLI and Bower are installed by running `grunt --version`. If the command isn't found, run `npm install -g grunt-cli`. For more information about installing the tools, see the [getting started with Grunt guide](http://gruntjs.com/getting-started).

1. Fork and clone the repo.
1. Run `npm install` to install all build dependencies (including Grunt).
1. Run `grunt` to compile the code.
1. Run tests as described on README.md.

Assuming that you don't see anything on red, you're ready to go. Just be sure to run `grunt` after making any changes, to ensure that nothing is broken.

## Submitting pull requests

1. Create a new branch, please don't work in your `master` branch directly.
1. Add failing tests for the change you want to make. Run `grunt` to see the tests fail.
1. Fix stuff.
1. Run tests (see README for instructions) and see the tests pass. Repeat steps 2-4 until all tests pass.
1. Update the documentation to reflect any changes.
1. Push to your fork and submit a pull request.
